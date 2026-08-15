import type { FavoriteType } from './data';

export interface Favorite {
  type: FavoriteType;
  id: string;
}

const STORAGE_KEY = 'notebook-hub-cz:favorites';

export function readFavorites(): Favorite[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((item): item is Favorite => typeof item === 'object' && item !== null && typeof (item as Favorite).type === 'string' && typeof (item as Favorite).id === 'string');
  } catch {
    return [];
  }
}

export function hasFavorite(type: FavoriteType, id: string): boolean {
  return readFavorites().some((favorite) => favorite.type === type && favorite.id === id);
}

export function toggleFavorite(type: FavoriteType, id: string): boolean {
  const favorites = readFavorites();
  const index = favorites.findIndex((favorite) => favorite.type === type && favorite.id === id);
  if (index >= 0) favorites.splice(index, 1);
  else favorites.push({ type, id });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  return index < 0;
}
