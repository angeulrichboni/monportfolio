import React, { useState } from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input, Textarea, Select } from '../../components/ui/FormElements';
import { useToast } from '../../context/ToastContext';
import { Plus, FileText, Calendar, Eye, MoreHorizontal, ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

const MOCK_POSTS = [
  { id: 1, title: 'The Future of Transformers in NLP', status: 'published', date: 'Oct 24, 2023', views: 1240, excerpt: 'Exploring the impact of attention mechanisms...', content: '# Hello World' },
  { id: 2, title: 'Optimizing Spark Pipelines for Scale', status: 'draft', date: 'Nov 02, 2023', views: 0, excerpt: 'Tips for reducing shuffle operations...', content: '' },
  { id: 3, title: 'Understanding Diffusion Models', status: 'published', date: 'Sep 15, 2023', views: 890, excerpt: 'Deep dive into image generation...', content: '' },
];

export const BlogList: React.FC = () => {
  const { addToast } = useToast();
  const [view, setView] = useState<'list' | 'editor'>('list');
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [currentPost, setCurrentPost] = useState<any>(null);

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setView('editor');
  };

  const handleCreate = () => {
    setCurrentPost({
      id: Date.now(),
      title: '',
      excerpt: '',
      content: '',
      status: 'draft',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0
    });
    setView('editor');
  };

  const handleSave = () => {
    if (posts.find(p => p.id === currentPost.id)) {
      setPosts(prev => prev.map(p => p.id === currentPost.id ? currentPost : p));
      addToast('success', 'Article updated');
    } else {
      setPosts(prev => [currentPost, ...prev]);
      addToast('success', 'Article created');
    }
    setView('list');
  };

  if (view === 'editor') {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => setView('list')}>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <h1 className="text-2xl font-bold text-slate-900">{currentPost.title || 'New Article'}</h1>
          </div>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" /> Save Article
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <Input 
                label="Article Title" 
                value={currentPost.title} 
                onChange={e => setCurrentPost({...currentPost, title: e.target.value})}
                placeholder="Enter a catchy title..."
                className="text-lg font-bold"
              />
              <div className="mt-6">
                <Textarea 
                  label="Markdown Content"
                  value={currentPost.content}
                  onChange={e => setCurrentPost({...currentPost, content: e.target.value})}
                  rows={20}
                  className="font-mono text-sm"
                  placeholder="# Write your masterpiece here..."
                />
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Publishing</h3>
              <Select 
                label="Status"
                options={[
                  { label: 'Draft', value: 'draft' },
                  { label: 'Published', value: 'published' }
                ]}
                value={currentPost.status}
                onChange={e => setCurrentPost({...currentPost, status: e.target.value})}
              />
              <Input 
                label="Publish Date"
                value={currentPost.date}
                readOnly
                className="bg-slate-50"
              />
            </Card>
            
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900">SEO & Metadata</h3>
              <Textarea 
                label="Excerpt"
                value={currentPost.excerpt}
                onChange={e => setCurrentPost({...currentPost, excerpt: e.target.value})}
                rows={3}
              />
              <div className="rounded-lg border-2 border-dashed border-slate-300 p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                 <ImageIcon className="mx-auto h-8 w-8 text-slate-400 mb-2" />
                 <p className="text-sm text-slate-500 font-medium">Upload Cover Image</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Blog Posts</h1>
          <p className="text-sm text-slate-500">Manage your technical articles and tutorials.</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="mr-2 h-4 w-4" /> New Article
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="group flex flex-col justify-between border-slate-200 p-0 transition-all hover:border-primary-300 hover:shadow-md cursor-pointer" onClick={() => handleEdit(post)}>
            <div className="h-40 w-full bg-slate-100 relative">
               <div className="absolute inset-0 flex items-center justify-center text-slate-300">
                  <FileText className="h-12 w-12" />
               </div>
               <div className="absolute right-3 top-3">
                 <Badge variant={post.status === 'published' ? 'success' : 'warning'} dot>
                   {post.status === 'published' ? 'Published' : 'Draft'}
                 </Badge>
               </div>
            </div>
            
            <div className="flex flex-1 flex-col p-5">
              <h3 className="mb-2 text-lg font-bold text-slate-900 group-hover:text-primary-700 transition-colors">
                {post.title || 'Untitled'}
              </h3>
              <p className="text-sm text-slate-500 line-clamp-2 mb-4">
                {post.excerpt || 'No excerpt provided.'}
              </p>
              <div className="mt-auto flex items-center justify-between text-sm text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="flex items-center"><Calendar className="mr-1.5 h-3 w-3" /> {post.date}</span>
                  {post.status === 'published' && (
                    <span className="flex items-center"><Eye className="mr-1.5 h-3 w-3" /> {post.views}</span>
                  )}
                </div>
                <button className="text-slate-400 hover:text-slate-700">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};