import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownViewerProps {
  content: string;
}

export const MarkdownViewer: React.FC<MarkdownViewerProps> = ({ content }) => {
  return (
    <div className="prose prose-slate max-w-none prose-headings:font-semibold prose-headings:text-slate-800 prose-p:text-slate-600 prose-strong:text-slate-800 prose-ul:list-disc prose-li:text-slate-600">
      <ReactMarkdown
        components={{
          h1: ({node, ...props}) => <h1 className="text-2xl mt-8 mb-4 border-b border-slate-200 pb-2" {...props} />,
          h2: ({node, ...props}) => <h2 className="text-xl mt-6 mb-3 text-indigo-700" {...props} />,
          h3: ({node, ...props}) => <h3 className="text-lg mt-4 mb-2 font-medium text-slate-700" {...props} />,
          ul: ({node, ...props}) => <ul className="list-disc pl-6 space-y-1 mb-4" {...props} />,
          li: ({node, ...props}) => <li className="pl-1" {...props} />,
          p: ({node, ...props}) => <p className="mb-4 leading-relaxed" {...props} />,
          code: ({node, ...props}) => <code className="bg-slate-100 text-slate-800 px-1 py-0.5 rounded text-sm font-mono" {...props} />,
          pre: ({node, ...props}) => <pre className="bg-slate-900 text-slate-50 p-4 rounded-lg overflow-x-auto mb-4" {...props} />,
          blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-indigo-500 pl-4 italic bg-slate-50 py-2 my-4 rounded-r" {...props} />
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
