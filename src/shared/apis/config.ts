// TODO: 팀원 코드 BFF 마이그레이션 완료 후 주석 해제
// import 'server-only';

const apiBaseUrl = process.env.API_BASE_URL;
const apiTeamId = process.env.API_TEAM_ID;

if (!apiBaseUrl) {
  throw new Error('API_BASE_URL is not defined.');
}
if (!apiTeamId) {
  throw new Error('API_TEAM_ID is not defined.');
}

export const BASE_URL = apiBaseUrl;
export const TEAM_ID = apiTeamId;
