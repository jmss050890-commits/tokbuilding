'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Heart, MessageCircle, Download, Archive, ChevronDown, ChevronUp } from 'lucide-react';

interface Receipt {
  _id: string;
  topic: string;
  userMessage: string;
  kpaResponse: string;
  keyTakeaways?: string[];
  actionItems?: Array<{ item: string; priority: 'high' | 'medium' | 'low' }>;
  timestamp: Date;
  archived: boolean;
}

export default function MrKpaReceiptsPage() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filterArchived, setFilterArchived] = useState(false);

  useEffect(() => {
    const loadReceipts = async () => {
      try {
        const response = await fetch('/api/memorials/mr-kpa/receipts');
        if (response.ok) {
          const data = await response.json();
          setReceipts(data.receipts || []);
        }
      } catch (error) {
        console.error('Error loading receipts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReceipts();
  }, []);

  const handleArchive = async (id: string) => {
    try {
      await fetch(`/api/memorials/mr-kpa/receipts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ archived: true }),
      });
      setReceipts(receipts.map((r) => (r._id === id ? { ...r, archived: true } : r)));
    } catch (error) {
      console.error('Error archiving receipt:', error);
    }
  };

  const displayReceipts = filterArchived
    ? receipts.filter((r) => r.archived)
    : receipts.filter((r) => !r.archived);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Navigation */}
      <nav className="bg-slate-900/80 backdrop-blur border-b border-blue-800/30 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Heart className="w-6 h-6 text-blue-600" />
            <h1 className="text-lg font-bold text-blue-100">
              My Conversation Receipts
            </h1>
          </div>
          <Link
            href="/memorials/dashboard"
            className="text-blue-300 hover:text-blue-200 text-sm"
          >
            Back
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-8 pb-20 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setFilterArchived(false)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                !filterArchived
                  ? 'bg-blue-600 text-white'
                  : 'border border-blue-600 text-blue-300 hover:bg-blue-900/30'
              }`}
            >
              Active ({receipts.filter((r) => !r.archived).length})
            </button>
            <button
              onClick={() => setFilterArchived(true)}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                filterArchived
                  ? 'bg-blue-600 text-white'
                  : 'border border-blue-600 text-blue-300 hover:bg-blue-900/30'
              }`}
            >
              Archived ({receipts.filter((r) => r.archived).length})
            </button>
          </div>

          {/* Receipts List */}
          {isLoading ? (
            <div className="text-center py-12 text-blue-300">Loading receipts...</div>
          ) : displayReceipts.length === 0 ? (
            <div className="text-center py-12 bg-slate-800/40 border border-blue-800/30 rounded-lg">
              <MessageCircle className="w-12 h-12 text-blue-600/30 mx-auto mb-4" />
              <p className="text-blue-100/60">
                {!filterArchived
                  ? 'No conversation receipts yet. Talk to Mr. KPA to start building your records.'
                  : 'No archived receipts.'}
              </p>
              {!filterArchived && (
                <Link
                  href="/memorials/mr-kpa/chat"
                  className="inline-block mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
                >
                  Start a Conversation
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {displayReceipts.map((receipt) => (
                <div
                  key={receipt._id}
                  className="bg-slate-800/40 border border-blue-800/30 rounded-lg overflow-hidden"
                >
                  {/* Header */}
                  <button
                    onClick={() => setExpandedId(expandedId === receipt._id ? null : receipt._id)}
                    className="w-full p-6 text-left hover:bg-slate-800/60 transition flex items-start justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-100 mb-2">
                        {receipt.topic || 'Untitled Conversation'}
                      </h3>
                      <p className="text-blue-300/70 text-sm line-clamp-2">
                        {receipt.userMessage}
                      </p>
                      <p className="text-blue-400/50 text-xs mt-2">
                        {new Date(receipt.timestamp).toLocaleDateString()} at{' '}
                        {new Date(receipt.timestamp).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    <div className="ml-4 flex-shrink-0 text-blue-600">
                      {expandedId === receipt._id ? (
                        <ChevronUp className="w-6 h-6" />
                      ) : (
                        <ChevronDown className="w-6 h-6" />
                      )}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {expandedId === receipt._id && (
                    <div className="px-6 pb-6 border-t border-blue-800/30 space-y-6">
                      {/* Your Question */}
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-3">Your Question</h4>
                        <div className="bg-slate-900/60 border border-blue-700/20 rounded p-4 text-blue-100">
                          {receipt.userMessage}
                        </div>
                      </div>

                      {/* Mr. KPA's Response */}
                      <div>
                        <h4 className="text-blue-300 font-semibold mb-3">Mr. KPA's Guidance</h4>
                        <div className="bg-blue-900/20 border border-blue-700/30 rounded p-4 text-blue-100 leading-relaxed">
                          {receipt.kpaResponse}
                        </div>
                      </div>

                      {/* Key Takeaways */}
                      {receipt.keyTakeaways && receipt.keyTakeaways.length > 0 && (
                        <div>
                          <h4 className="text-blue-300 font-semibold mb-3">Key Takeaways</h4>
                          <ul className="space-y-2">
                            {receipt.keyTakeaways.map((takeaway, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-blue-100">
                                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                                <span>{takeaway}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Items */}
                      {receipt.actionItems && receipt.actionItems.length > 0 && (
                        <div>
                          <h4 className="text-blue-300 font-semibold mb-3">Action Items</h4>
                          <div className="space-y-2">
                            {receipt.actionItems.map((item, idx) => (
                              <div
                                key={idx}
                                className={`flex items-start gap-3 p-3 rounded border-l-4 ${
                                  item.priority === 'high'
                                    ? 'bg-red-900/20 border-red-600 text-red-100'
                                    : item.priority === 'medium'
                                    ? 'bg-yellow-900/20 border-yellow-600 text-yellow-100'
                                    : 'bg-green-900/20 border-green-600 text-green-100'
                                }`}
                              >
                                <span className="font-semibold text-sm capitalize flex-shrink-0 w-12">
                                  {item.priority}
                                </span>
                                <span>{item.item}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex gap-3 pt-4 border-t border-blue-800/30">
                        <button
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-blue-900/40 text-blue-300 hover:bg-blue-900/60 rounded transition"
                        >
                          <Download className="w-4 h-4" />
                          Export
                        </button>
                        <button
                          onClick={() => handleArchive(receipt._id)}
                          className="flex items-center gap-2 px-4 py-2 text-sm bg-slate-700/40 text-slate-300 hover:bg-slate-700/60 rounded transition"
                        >
                          <Archive className="w-4 h-4" />
                          Archive
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
