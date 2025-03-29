// Esse tipo ainda não está sendo utilizado

export type Match = {
  start_time: string;
  status: string;
  home_score: number;
  away_score: number;
  home_team: {
    id: string;
    api_sports_id: string;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
  };
  away_team: {
    id: string;
    api_sports_id: string;
    name: string;
    icon: string;
    created_at: string;
    updated_at: string;
  };
}
