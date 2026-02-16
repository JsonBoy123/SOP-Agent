import React, { useState, useEffect } from 'react';
import { getAdminStats, deleteSOP, reindexDocument } from '../services/apiService';
import FileUpload from './FileUpload';
import { toast } from 'react-toastify';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const result = await getAdminStats();
      if (result.success) {
        setStats(result.stats);
        setDocuments(result.stats.documents || []);
      }
    } catch (error) {
      toast.error('Failed to load admin stats');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) {
      return;
    }

    try {
      setDeleting(documentId);
      const result = await deleteSOP(documentId);
      if (result.success) {
        toast.success('Document deleted successfully');
        await loadStats();
      }
    } catch (error) {
      toast.error('Failed to delete document');
    } finally {
      setDeleting(null);
    }
  };

  const handleReindex = async (documentId) => {
    try {
      const result = await reindexDocument(documentId);
      if (result.success) {
        toast.success('Document reindexed successfully');
      }
    } catch (error) {
      toast.error('Failed to reindex document');
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h2>⚙️ Admin Dashboard</h2>
        <p>Manage your SOP documents and knowledge base</p>
      </div>

      <div className="row">
        <div className="col-md-6 mb-4">
          <FileUpload onUploadSuccess={loadStats} />
        </div>

        <div className="col-md-6">
          <div className="stats-cards">
            {loading ? (
              <p>Loading stats...</p>
            ) : (
              <>
                <div className="stat-card">
                  <div className="stat-value">{stats?.totalDocuments || 0}</div>
                  <div className="stat-label">Total Documents</div>
                </div>
                <div className="stat-card">
                  <div className="stat-value">{stats?.totalChunks || 0}</div>
                  <div className="stat-label">Total Chunks</div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="documents-section mt-5">
        <h3>📄 Documents List</h3>
        {documents.length === 0 ? (
          <p className="text-muted">No documents uploaded yet.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Document Name</th>
                  <th>Pages</th>
                  <th>Uploaded</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {documents.map(doc => (
                  <tr key={doc.documentId}>
                    <td>{doc.fileName}</td>
                    <td>{doc.pageCount}</td>
                    <td>
                      {new Date(doc.uploadedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleReindex(doc.documentId)}
                      >
                        Reindex
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDeleteDocument(doc.documentId)}
                        disabled={deleting === doc.documentId}
                      >
                        {deleting === doc.documentId ? 'Deleting...' : 'Delete'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
