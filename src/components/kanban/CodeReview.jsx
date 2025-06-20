import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'prism-react-renderer';

export default function CodeReview({ cardId, repoUrl }) {
  const [files, setFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const fetchFiles = async () => {
    // In a real app, this would fetch from your API which connects to GitHub/GitLab
    const mockFiles = [
      { name: 'src/components/Button.js', language: 'javascript' },
      { name: 'src/styles/main.css', language: 'css' },
      { name: 'package.json', language: 'json' }
    ];
    setFiles(mockFiles);
  };

  const fetchFileContent = async (file) => {
    // Mock content
    const mockContent = file.language === 'javascript' 
      ? `import React from 'react';\n\nexport default function Button({ children }) {\n  return <button className="btn">{children}</button>;\n}`
      : file.language === 'css'
      ? `.btn {\n  padding: 8px 16px;\n  background: blue;\n  color: white;\n}`
      : `{\n  "name": "my-app",\n  "version": "1.0.0"\n}`;
    
    setSelectedFile({ ...file, content: mockContent });
  };

  const addComment = () => {
    if (newComment.trim() && selectedFile) {
      const comment = {
        id: Date.now(),
        file: selectedFile.name,
        line: 1, // In real app would track selected line
        text: newComment,
        author: 'Current User',
        timestamp: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  return (
    <div className="mt-4 border-t pt-4">
      <h3 className="font-medium mb-2">Code Review</h3>
      
      {repoUrl ? (
        <>
          <button 
            onClick={fetchFiles}
            className="mb-3 px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
          >
            Load Files from {repoUrl}
          </button>
          
          {files.length > 0 && (
            <div className="flex">
              <div className="w-1/4 pr-4 border-r">
                <h4 className="font-medium mb-2">Files</h4>
                <ul className="space-y-1">
                  {files.map(file => (
                    <li 
                      key={file.name}
                      onClick={() => fetchFileContent(file)}
                      className={`p-1 text-sm cursor-pointer hover:bg-gray-100 rounded ${
                        selectedFile?.name === file.name ? 'bg-gray-200' : ''
                      }`}
                    >
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="w-3/4 pl-4">
                {selectedFile ? (
                  <>
                    <div className="relative">
                      <SyntaxHighlighter
                        language={selectedFile.language}
                        code={selectedFile.content}
                        className="rounded text-sm"
                      >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                          <pre className={className} style={style}>
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line, key: i })}>
                                <span className="line-number">{i + 1}</span>
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token, key })} />
                                ))}
                              </div>
                            ))}
                          </pre>
                        )}
                      </SyntaxHighlighter>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Comments</h4>
                      <div className="space-y-3 mb-3">
                        {comments.filter(c => c.file === selectedFile.name).map(comment => (
                          <div key={comment.id} className="bg-gray-50 p-2 rounded">
                            <div className="flex justify-between text-sm">
                              <span className="font-medium">{comment.author}</span>
                              <span className="text-gray-500">
                                {new Date(comment.timestamp).toLocaleString()}
                              </span>
                            </div>
                            <p className="mt-1">{comment.text}</p>
                          </div>
                        ))}
                      </div>
                      
                      <div className="flex">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Add code review comment..."
                          className="flex-1 p-2 border rounded-l"
                        />
                        <button
                          onClick={addComment}
                          className="px-3 py-2 bg-blue-500 text-white rounded-r hover:bg-blue-600"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500">Select a file to view</p>
                )}
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">Connect a repository to enable code reviews</p>
      )}
    </div>
  );
}