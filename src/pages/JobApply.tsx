import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getSupabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Upload } from "lucide-react";

const JobApply = () => {
  const [params] = useSearchParams();
  const jobId = params.get('jobId') || '';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setError(null);

    try {
      const supabase = getSupabase();

      let resumeUrl: string | null = null;
      if (resumeFile) {
        const path = `resumes/${crypto.randomUUID()}-${resumeFile.name}`;
        const { error: uploadError } = await supabase.storage.from('community_uploads').upload(path, resumeFile, {
          upsert: false,
        });
        if (uploadError) throw uploadError;
        const { data: publicUrl } = supabase.storage.from('community_uploads').getPublicUrl(path);
        resumeUrl = publicUrl.publicUrl;
      }

      const { error: insertError } = await supabase.from('job_applications').insert({
        job_id: jobId,
        name,
        email,
        cover_letter: coverLetter,
        resume_url: resumeUrl,
        created_at: new Date().toISOString(),
      });
      if (insertError) throw insertError;

      setMessage('Application submitted successfully!');
      setName('');
      setEmail('');
      setCoverLetter('');
      setResumeFile(null);
    } catch (err: any) {
      setError(err?.message || 'Failed to submit application');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-6">
        <Link to="/jobs">
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Jobs
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Apply for Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="cover">Cover Letter</Label>
              <Textarea id="cover" value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} rows={6} />
            </div>
            <div>
              <Label htmlFor="resume">Resume (PDF or DOC)</Label>
              <Input id="resume" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setResumeFile(e.target.files?.[0] || null)} />
            </div>

            <Button type="submit" disabled={submitting} className="w-full">
              <Upload className="w-4 h-4 mr-2" /> {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>

            {message && <div className="text-green-600 text-sm">{message}</div>}
            {error && <div className="text-red-600 text-sm">{error}</div>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default JobApply;