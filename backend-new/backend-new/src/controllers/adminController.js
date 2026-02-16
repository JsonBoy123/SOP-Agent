const SOP = require('../models/sop');
const fs = require('fs');

const deleteSOP = async (req, res) => {
  try {
    const { documentId } = req.params;

    const sop = await SOP.findOne({ documentId });

    if (!sop) {
      return res.status(404).json({
        success: false,
        message: 'SOP document not found',
      });
    }

    // Delete the file from disk
    if (fs.existsSync(sop.filePath)) {
      fs.unlinkSync(sop.filePath);
    }

    // Delete from database
    await SOP.deleteOne({ documentId });

    res.json({
      success: true,
      message: 'SOP document deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAdminStats = async (req, res) => {
  try {
    const totalDocuments = await SOP.countDocuments();
    const totalChunks = await SOP.aggregate([
      {
        $group: {
          _id: null,
          total: {
            $sum: { $size: '$chunks' },
          },
        },
      },
    ]);

    const documentsInfo = await SOP.find({}, {
      documentId: 1,
      fileName: 1,
      pageCount: 1,
      uploadedAt: 1,
    }).sort({ uploadedAt: -1 });

    res.json({
      success: true,
      stats: {
        totalDocuments,
        totalChunks: totalChunks[0]?.total || 0,
        documents: documentsInfo,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const reindexDocument = async (req, res) => {
  try {
    const { documentId } = req.params;

    const sop = await SOP.findOne({ documentId });

    if (!sop) {
      return res.status(404).json({
        success: false,
        message: 'SOP document not found',
      });
    }

    // Mark as indexed
    sop.isIndexed = true;
    await sop.save();

    res.json({
      success: true,
      message: 'Document reindexed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  deleteSOP,
  getAdminStats,
  reindexDocument,
};
