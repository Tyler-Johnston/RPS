export const environment = {
    production: true,
    supabaseUrl: (window as any)['env']['supabaseUrl'] || '',
    supabaseAnonKey: (window as any)['env']['supabaseAnonKey'] || ''
  };
  