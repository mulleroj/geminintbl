import { parseProject, serializeProject } from './model';
import type { SlideEditorProject } from './types';

const DB_NAME = 'notebook-hub-cz-slide-editor';
const STORE_NAME = 'projects';
const PROJECT_KEY = 'last-project';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);
    request.addEventListener('upgradeneeded', () => request.result.createObjectStore(STORE_NAME));
    request.addEventListener('success', () => resolve(request.result));
    request.addEventListener('error', () => reject(request.error));
  });
}

export async function saveProject(project: SlideEditorProject): Promise<void> {
  try {
    const database = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).put(serializeProject(project), PROJECT_KEY);
      transaction.addEventListener('complete', () => resolve());
      transaction.addEventListener('error', () => reject(transaction.error));
    });
    database.close();
  } catch {
    // Persistence is an enhancement; editing and export work without it.
  }
}

export async function readProject(): Promise<SlideEditorProject | null> {
  try {
    const database = await openDatabase();
    const value = await new Promise<unknown>((resolve, reject) => {
      const request = database.transaction(STORE_NAME, 'readonly').objectStore(STORE_NAME).get(PROJECT_KEY);
      request.addEventListener('success', () => resolve(request.result));
      request.addEventListener('error', () => reject(request.error));
    });
    database.close();
    return typeof value === 'string' ? parseProject(value) : null;
  } catch {
    return null;
  }
}

export async function clearProject(): Promise<void> {
  try {
    const database = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = database.transaction(STORE_NAME, 'readwrite');
      transaction.objectStore(STORE_NAME).delete(PROJECT_KEY);
      transaction.addEventListener('complete', () => resolve());
      transaction.addEventListener('error', () => reject(transaction.error));
    });
    database.close();
  } catch {
    // Ignore storage failures; this is not required for the core workflow.
  }
}
