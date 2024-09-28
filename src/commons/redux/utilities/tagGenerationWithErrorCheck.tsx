import { TagDescription } from '@reduxjs/toolkit/query';

export const tagTypes = [
  // Website Management
  'website',
  'user-specific-data',
  // Content Management
  'program',
  'programs',
  'fsm',
  'fsms',
  'program-admins',
  'fsm-states',
  'fsm-state',
  'fsm-edges',
  'widget',
  'paper',
  'articles',
  'article',
  'form',
  'forms',
  'registration-receipt',
  'registration-receipts',
  'answer-sheet',
  'answer-sheets',
  'player',
  'player-transited-path',
  'website-profile',
  'user-profile',
  'institutes',
  'schools',
  'merchandises',
  'merchandise',
  'discount-codes',
  'currencies',
  'teams',
  'team',
  'my-invitations',
  'team-invitations',
  'Position',
  'user-specific-data',
]

// Define a type for the tag types used in your app
type TagTypes = typeof tagTypes[number];

// Helper function to create a tag with an optional id
const createTag = (type: TagTypes, id?: string | number): TagDescription<TagTypes> =>
  id ? { type, id } : { type };

// Updated helper function
const tagGenerationWithErrorCheck = (tags: TagTypes[] | ((result: any, error: any, arg: any) => TagDescription<TagTypes>[])) =>
  (result: any, error: any, arg: any): TagDescription<TagTypes>[] => {
    if (result && !error) {
      if (typeof tags === 'function') {
        return tags(result, error, arg);
      } else {
        return tags.map(tag => createTag(tag));
      }
    }
    return [];
  };

export default tagGenerationWithErrorCheck;