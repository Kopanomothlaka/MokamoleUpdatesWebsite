import { useState } from 'react';
import { getSupabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SupabaseTest = () => {
  const [status, setStatus] = useState<'idle' | 'testing' | 'success' | 'warn' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const testConnection = async () => {
    setStatus('testing');
    setMessage('Testing Supabase connection...');

    try {
      const supabase = getSupabase();
      // Try a lightweight read; this verifies env vars and DB access.
      const { data, error } = await supabase
        .from('news')
        .select('id', { count: 'exact', head: true })
        .limit(1);

      if (error) {
        // If relation missing, env is fine but tables not created.
        if (error.message && /relation .* does not exist/i.test(error.message)) {
          setStatus('warn');
          setMessage('✅ Env OK. But table "news" not found. Run the SQL in SUPABASE_SETUP.md to create tables.');
          return;
        }
        // If RLS blocks access
        if (error.message && /permission denied|rls/i.test(error.message)) {
          setStatus('warn');
          setMessage('✅ Env OK. RLS blocking reads. Add public SELECT policy as per SUPABASE_SETUP.md.');
          return;
        }
        throw error;
      }

      setStatus('success');
      setMessage('✅ Supabase connection successful! (Read from "news" succeeded or table exists)');
    } catch (error) {
      setStatus('error');
      setMessage(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Supabase Connection Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button onClick={testConnection} disabled={status === 'testing'} className="w-full">
          {status === 'testing' ? 'Testing...' : 'Test Connection'}
        </Button>
        {message && (
          <div className={`p-3 rounded-md text-sm ${
            status === 'success' ? 'bg-green-100 text-green-800' :
            status === 'warn' ? 'bg-yellow-100 text-yellow-800' :
            status === 'error' ? 'bg-red-100 text-red-800' :
            'bg-blue-100 text-blue-800'
          }`}>
            {message}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SupabaseTest; 