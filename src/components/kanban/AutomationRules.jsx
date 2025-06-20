import { useState } from 'react';

export default function AutomationRules({ boardId, onCreateRule }) {
  const [rule, setRule] = useState({
    trigger: '',
    condition: '',
    action: ''
  });

  const triggers = [
    'When card is created',
    'When card is moved',
    'When due date approaches',
    'When status changes'
  ];

  const actions = [
    'Assign to team member',
    'Set due date',
    'Add label',
    'Send notification',
    'Create follow-up task'
  ];

  const handleCreateRule = () => {
    onCreateRule({ ...rule, boardId });
    setRule({ trigger: '', condition: '', action: '' });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="font-medium mb-3">Automation Rules</h3>
      
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">When</label>
          <select
            value={rule.trigger}
            onChange={(e) => setRule({...rule, trigger: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Select trigger</option>
            {triggers.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">If</label>
          <input
            type="text"
            placeholder="Condition (e.g., label is 'urgent')"
            value={rule.condition}
            onChange={(e) => setRule({...rule, condition: e.target.value})}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Then</label>
          <select
            value={rule.action}
            onChange={(e) => setRule({...rule, action: e.target.value})}
            className="w-full p-2 border rounded"
          >
            <option value="">Select action</option>
            {actions.map(a => (
              <option key={a} value={a}>{a}</option>
            ))}
          </select>
        </div>
        
        <button
          onClick={handleCreateRule}
          disabled={!rule.trigger || !rule.action}
          className="w-full mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          Create Rule
        </button>
      </div>
    </div>
  );
}