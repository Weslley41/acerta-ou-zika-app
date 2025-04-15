import { MatchResult, MatchStatus, type MatchGuess } from '$lib/types';

export class GuessScore {
	private guessHome: number;
	private guessAway: number;
	private guessGolsDifference: number;
	private guessResult: MatchResult;
	private matchHome: number;
	private matchAway: number;
	private matchGolsDifference: number;
	private matchResult: MatchResult | null;
	private matchStatus: MatchStatus;
	public pointsEarned: number;

	constructor(guess: MatchGuess) {
		this.guessHome = guess.home_score;
		this.guessAway = guess.away_score;
		this.guessGolsDifference = Math.abs(this.guessHome - this.guessAway);
		this.guessResult = guess.result_guess;
		this.matchHome = guess.match.home_score;
		this.matchAway = guess.match.away_score;
		this.matchGolsDifference = Math.abs(this.matchHome - this.matchAway);
		this.matchResult = guess.match.result;
		this.matchStatus = guess.match.status;

		if (this.matchStatus === MatchStatus.Finished) {
			this.pointsEarned = guess.points_earned;
		} else {
			this.pointsEarned = this.calculatePoints();
		}
	}

	public get isHomeGolsRight(): boolean {
		return this.guessHome === this.matchHome;
	}

	public get isAwayGolsRight(): boolean {
		return this.guessAway === this.matchAway;
	}

	public get isGolsDifferenceRight(): boolean {
		return this.guessGolsDifference === this.matchGolsDifference;
	}

	public get isResultGuessRight(): boolean {
		return this.guessResult === this.matchResult;
	}

	private calculatePoints(): number {
		let score = 0;
		if (this.isHomeGolsRight) {
			score += 2;
		}
		if (this.isAwayGolsRight) {
			score += 2;
		}
		if (this.isGolsDifferenceRight) {
			score += 1;
		}
		if (this.isResultGuessRight) {
			score += 5;
		}

		return score;
	}
}
