import type { Team } from './Team';

export enum MatchStatus {
	NotStarted = 'NotStarted',
	InProgress = 'InProgress',
	Finished = 'Finished'
}

export enum MatchResult {
	Home = 'Home',
	Away = 'Away',
	Draw = 'Draw'
}

export type Match = {
	id: string;
	api_sports_id: string;
	season: number;
	round: number;
	home_team_id: string;
	home_team: Team;
	away_team_id: string;
	away_team: Team;
	status: MatchStatus;
	result: MatchResult | null;
	home_score: number;
	away_score: number;
	start_time: string;
	created_at: string;
	updated_at: string;
};
