export const AppState = {
  currentPage: 'login',
  isAuthenticated: false,
  currentUser: null,
  user: { name: 'User', email: '' },
  upload: { file: null, fileName: '', fileSize: '', fileType: null, fileFormat: '', fileRawSize: 0 },
  analysis: { progress: 0, logLines: [], fakeScore: 0, threatLevel: '', confidence: '' },
  analysisTimerId: null,
  hasResults: false,
  historyPage: 0
};
