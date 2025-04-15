import type { Match, MatchResult } from './Match';

export enum TypeGuess {
	SimpleResult = 'SimpleResult',
	WithScore = 'WithScore'
}

export type MatchGuess = {
	id: string;
	user_id: string;
	match_id: string;
	match: Match;
	type_guess: TypeGuess;
	result_guess: MatchResult;
	points_earned: number;
	home_score: number;
	away_score: number;
	created_at: string;
	updated_at: string;
};
