'use client';

import { useState, useEffect } from 'react';

interface Task {
  id: string;
  name: string;
  phase: string;
  priority: string;
  status: string;
  dueDate: string | null;
  description: string;
  metric: string;
  url: string;
}

interface TaskStats {
  total: number;
  byPhase: Record<string, number>;
  byStatus: Record<string, number>;
  byPriority: Record<string, number>;
}

const phaseColors: Record<string, string> = {
  'Phase 1': 'bg-red-500',
  'Phase 2': 'bg-yellow-500',
  'Phase 3': 'bg-green-500',
  'Setup': 'bg-blue-500',
  'Development': 'bg-purple-500',
  'Testing': 'bg-orange-500',
  'Launch': 'bg-emerald-500',
};

const priorityColors: Record<string, string> = {
  'High': 'text-red-400 bg-red-400/10 border-red-400/30',
  'Medium': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  'Low': 'text-gray-400 bg-gray-400/10 border-gray-400/30',
};

const statusColors: Record<string, string> = {
  'Not Started': 'bg-gray-500',
  'In Progress': 'bg-blue-500',
  'Completed': 'bg-green-500',
  'Blocked': 'bg-red-500',
};

export default function TasksView() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [stats, setStats] = useState<TaskStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ phase: '', status: '', priority: '' });
  const [viewMode, setViewMode] = useState<'list' | 'kanban'>('list');
  const [updating, setUpdating] = useState<string | null>(null);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filter]);

  async function fetchTasks() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filter.phase) params.set('phase', filter.phase);
      if (filter.status) params.set('status', filter.status);
      if (filter.priority) params.set('priority', filter.priority);

      const res = await fetch(`/api/tasks?${params.toString()}`);
      const data = await res.json();

      if (data.success) {
        setTasks(data.tasks);
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchStats() {
    try {
      const res = await fetch('/api/tasks?stats=true');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  }

  async function updateTaskStatus(taskId: string, newStatus: string) {
    try {
      setUpdating(taskId);
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success) {
        setTasks(tasks.map(t => t.id === taskId ? data.task : t));
        fetchStats();
      }
    } catch (err) {
      console.error('Error updating task:', err);
    } finally {
      setUpdating(null);
    }
  }

  const phases = [...new Set(tasks.map(t => t.phase))];
  const statuses = ['Not Started', 'In Progress', 'Completed', 'Blocked'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            📋 Task Management
          </h1>
          <p className="text-gray-400 mt-2">Track your implementation progress</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-white">{stats.total}</div>
              <div className="text-gray-400 text-sm">Total Tasks</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-green-400">
                {stats.byStatus['Completed'] || 0}
              </div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-blue-400">
                {stats.byStatus['In Progress'] || 0}
              </div>
              <div className="text-gray-400 text-sm">In Progress</div>
            </div>
            <div className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50">
              <div className="text-3xl font-bold text-red-400">
                {stats.byPriority['High'] || 0}
              </div>
              <div className="text-gray-400 text-sm">High Priority</div>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {stats && (
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Overall Progress</span>
              <span>{Math.round(((stats.byStatus['Completed'] || 0) / stats.total) * 100)}%</span>
            </div>
            <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-500"
                style={{ width: `${((stats.byStatus['Completed'] || 0) / stats.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Filters & View Toggle */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={filter.phase}
            onChange={(e) => setFilter({ ...filter, phase: e.target.value })}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">All Phases</option>
            {phases.map(p => <option key={p} value={p}>{p}</option>)}
          </select>

          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">All Statuses</option>
            {statuses.map(s => <option key={s} value={s}>{s}</option>)}
          </select>

          <select
            value={filter.priority}
            onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
            className="bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 outline-none"
          >
            <option value="">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div className="ml-auto flex gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                viewMode === 'list' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📋 List
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`px-4 py-2 rounded-lg text-sm transition ${
                viewMode === 'kanban' 
                  ? 'bg-cyan-500 text-white' 
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              📊 Kanban
            </button>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 mb-6 text-red-400">
            Error: {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
          </div>
        )}

        {/* List View */}
        {!loading && viewMode === 'list' && (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="bg-gray-800/50 backdrop-blur rounded-xl p-4 border border-gray-700/50 hover:border-cyan-500/30 transition group"
              >
                <div className="flex items-start gap-4">
                  {/* Status Indicator */}
                  <div className={`w-3 h-3 rounded-full mt-1.5 ${statusColors[task.status]}`} />
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-medium text-white">{task.name}</h3>
                      <span className={`px-2 py-0.5 rounded text-xs border ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-xs text-white/80 ${phaseColors[task.phase] || 'bg-gray-500'}`}>
                        {task.phase}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm mt-1">{task.description}</p>
                    <p className="text-cyan-400 text-xs mt-2">📊 {task.metric}</p>
                  </div>

                  {/* Status Dropdown */}
                  <select
                    value={task.status}
                    onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                    disabled={updating === task.id}
                    className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-cyan-500 outline-none disabled:opacity-50"
                  >
                    {statuses.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>

                  {/* Open in Notion */}
                  <a
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-cyan-400 transition opacity-0 group-hover:opacity-100"
                    title="Open in Notion"
                  >
                    ↗️
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Kanban View */}
        {!loading && viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {statuses.map((status) => (
              <div key={status} className="bg-gray-800/30 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
                  <h3 className="font-medium text-white">{status}</h3>
                  <span className="text-gray-500 text-sm">
                    ({tasks.filter(t => t.status === status).length})
                  </span>
                </div>
                <div className="space-y-3">
                  {tasks
                    .filter(t => t.status === status)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-800/70 rounded-lg p-3 border border-gray-700/50 hover:border-cyan-500/30 transition cursor-pointer"
                        onClick={() => window.open(task.url, '_blank')}
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`px-2 py-0.5 rounded text-xs border ${priorityColors[task.priority]}`}>
                            {task.priority}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-xs text-white/80 ${phaseColors[task.phase] || 'bg-gray-500'}`}>
                            {task.phase}
                          </span>
                        </div>
                        <h4 className="text-sm font-medium text-white">{task.name}</h4>
                        <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && tasks.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            <div className="text-4xl mb-4">📭</div>
            <p>No tasks found matching your filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
