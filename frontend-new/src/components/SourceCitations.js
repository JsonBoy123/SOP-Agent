import React from 'react';
import '../styles/SourceCitations.css';

const SourceCitations = ({ sources }) => {
  const [expandedSource, setExpandedSource] = React.useState(null);

  const toggleSource = (sourceId) => {
    setExpandedSource(expandedSource === sourceId ? null : sourceId);
  };

  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="source-citations">
      <div className="sources-header">
        <h5>📚 Sources</h5>
      </div>
      <div className="sources-list">
        {sources.map(source => (
          <div key={source.id} className="source-item">
            <button
              className="source-button"
              onClick={() => toggleSource(source.id)}
            >
              <span className="source-number">[{source.id}]</span>
              <span className="source-info">
                <strong>{source.fileName}</strong> - Page {source.pageNumber}
                {source.sectionTitle && ` • ${source.sectionTitle}`}
              </span>
              <span className="expand-icon">
                {expandedSource === source.id ? '▼' : '▶'}
              </span>
            </button>
            {expandedSource === source.id && (
              <div className="source-details">
                <p>
                  <strong>Document:</strong> {source.fileName}
                </p>
                <p>
                  <strong>Page:</strong> {source.pageNumber}
                </p>
                {source.sectionTitle && (
                  <p>
                    <strong>Section:</strong> {source.sectionTitle}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SourceCitations;
