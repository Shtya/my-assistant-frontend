import React, { useState } from 'react';
import Modal2 from '@/components/molecules/Modal2';
import { FiX, FiCornerDownLeft } from 'react-icons/fi';
import Button from '@/components/atoms/Button';
import AnimatedSelect from '@/components/atoms/AnimatedSelect';
import AnimatedRadio from '@/components/atoms/AnimatedRadio';
import AnimatedInput from '@/components/atoms/AnimatedInput';

const CreateBoardDialog = ({ loadingCreateBoard, open, onClose, createBoard }) => {
  const [title, setTitle] = useState('');
  const [visibility, setVisibility] = useState('public');
  const [inviteInput, setInviteInput] = useState('');
  const [invites, setInvites] = useState([]);
  const [emailError, setEmailError] = useState('');

  const isValidEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAddEmail = () => {
    const emails = inviteInput
      .split(',')
      .map(e => e.trim())
      .filter(e => e);

    const invalidEmails = emails.filter(e => !isValidEmail(e));
    const newValidEmails = emails.filter(e => isValidEmail(e) && !invites.some(inv => inv.email === e)).map(email => ({ email: email, role: 'member' }));

    if (invalidEmails.length > 0) {
      setEmailError(`Invalid email: ${invalidEmails.join(', ')}`);
      return;
    }

    setEmailError('');
    setInvites([...invites, ...newValidEmails]);
    setInviteInput('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddEmail();
    }
  };

  const removeEmail = email => {
    setInvites(invites.filter(inv => inv.email !== email));
  };

  const handleRoleChange = (email, newRole) => {
    setInvites(prev => prev.map(inv => (inv.email === email ? { ...inv, role: newRole } : inv)));
  };

  const handleSubmit = async () => {
    if (!title.trim()) return;

    await createBoard(title, visibility, invites);
    setTitle('');
    setVisibility('public');
    setInviteInput('');
    setInvites([]);
    onClose();
  };

  return (
    <Modal2 title={<h2 className='text-xl font-bold text-gray-800 dark:text-white'>Create New Board</h2>} width='480px' open={open} onClose={onClose} cn='bg-white dark:bg-gray-900 p-6'>
      <div className='px-1 space-y-5 text-gray-800 dark:text-gray-100'>
        {/* Title */}
        <AnimatedInput label='Board Title' value={title} onChange={e => setTitle(e.target.value)} placeholder='e.g. Project Roadmap' />

        {/* Invite Emails */}
        <div>
          <label className='block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1'>Invite Members</label>
          <div className='w-full border border-gray-300 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-gray-800'>
            {invites?.length > 0 && (
              <div className='flex flex-col gap-2 mb-2'>
                {invites.map(({ email, role }) => (
                  <div key={email} className='flex items-center justify-between bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-200 text-sm px-2 py-1 rounded-lg'>
                    <span className='truncate'>{email}</span>
                    <div className='flex items-center gap-2 ml-2'>
                      <AnimatedSelect
                        value={role}
                        onChange={e => handleRoleChange(email, e)}
                        options={[
                          { value: 'admin', label: 'Admin' },
                          { value: 'member', label: 'Member' },
                          { value: 'viewer', label: 'Viewer' },
                        ]}
                        placeholder='Choose Role'
                      />
                      <button onClick={() => removeEmail(email)} className='hover:text-red-500' title='Remove'>
                        <FiX size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className='flex items-center'>
              <input type='email' className='flex-1 bg-transparent px-2 py-1 focus:outline-none text-sm text-gray-800 dark:text-gray-100' placeholder='Enter email and press Enter...' value={inviteInput} onChange={e => setInviteInput(e.target.value)} onKeyDown={handleKeyDown} />
              {inviteInput.trim() && <FiCornerDownLeft className='text-gray-400 dark:text-gray-500 ml-2 animate-bounce' size={18} />}
            </div>
            {emailError && <p className='text-sm text-red-500 mt-1'>{emailError}</p>}
          </div>
        </div>

        {/* Visibility */}
        <AnimatedRadio
          label='Visibility'
          name='visibility'
          options={[
            {
              value: 'public',
              label: 'Public',
              desc: 'Anyone can see this board',
            },
            {
              value: 'team',
              label: 'Team',
              desc: 'Only team members can see this board',
            },
            {
              value: 'private',
              label: 'Private',
              desc: 'Only you can see this board',
            },
          ]}
          value={visibility}
          onChange={setVisibility}
        />

        {/* Actions */}
        <div className='pt-4 flex justify-end gap-3'>
          <Button label={'Cancel'} onClick={onClose} color='white' />
          <Button loading={loadingCreateBoard} label={'Create Board'} color='primary' onClick={handleSubmit} />
        </div>
      </div>
    </Modal2>
  );
};

export default CreateBoardDialog;
