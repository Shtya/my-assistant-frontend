'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, baseUrl } from '@/helper/api';
import toast, { Toaster } from 'react-hot-toast';
import Image from 'next/image';
import FileUploadModal from '@/components/molecules/FileUploadModal';

export default function UserProfile() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('profile');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: '',
    email: '',
    avatar: null,
    phone: '',
    address: null,
    businessDetails: null,
    fullName: '',
    role: '',
    status: '',
  });
  const [invitations, setInvitations] = useState([]);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [selectedFileUrl, setSelectedFileUrl] = useState('');
  const [userAssets, setUserAssets] = useState([]); // Existing files

  useEffect(() => {
    fetchUserData();
    fetchInvitations();
  }, []);

  useEffect(() => {
    selectedFileUrl && setEditing(true);
  }, [selectedFileUrl]);

  const fetchUserData = async () => {
    try {
      const response = await api.get('auth/profile');
      setUserData(response.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch user data');
      router.push('/auth');
    }
  };

  const fetchInvitations = async () => {
    try {
      // const response = await api.get('invitations');
      // setInvitations(response.data);
    } catch (error) {
      toast.error('Failed to fetch invitations');
    }
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = e => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      const data = {
        fullName: userData?.fullName,
        phone: userData?.phone,
        address: userData?.address,
        businessDetails: userData?.businessDetails,
        avatar: selectedFileUrl,
      };

      const response = await api.patch('users/update-profile', data);

      setUserData(response.data);
      setEditing(false);
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }

      setLoading(true);
      await api.post('auth/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      toast.success('Password changed successfully');
    } catch (error) {
      toast.error('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const handleInvitationAction = async (invitationId, action) => {
    try {
      await api.post(`invitations/${invitationId}/${action}`);
      fetchInvitations();
      toast.success(`Invitation ${action === 'accept' ? 'accepted' : 'rejected'}`);
    } catch (error) {
      toast.error(`Failed to ${action} invitation`);
    }
  };

  if (loading) return <SkeletonLoader />;

  return (
    <div className='min-h-screen   text-gray-800'>
      <div className=' !px-4 !py-4 '>
        <div className='card2 !p-0 rounded-2xl shadow-lg overflow-hidden'>
          {/* Tabs */}
          <div className='border-b border-gray-200'>
            <nav className='flex space-x-4 px-6'>
              {[
                { id: 'profile', label: 'Profile' },
                { id: 'invitations', label: 'Invitations' },
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-4 border-b-2 text-sm font-medium transition duration-150 ease-in-out ${activeTab === tab.id ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className='p-6'>
            {activeTab === 'profile' ? (
              <div className='space-y-10'>
                {/* Personal Info */}
                <section className='space-y-6'>
                  <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold text-gray-800'>Personal Information</h2>
                    {editing ? (
                      <div className='space-x-2'>
                        <button onClick={handleSaveProfile} disabled={loading} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50'>
                          {loading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button onClick={() => setEditing(false)} className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg'>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setEditing(true)} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg'>
                        Edit Profile
                      </button>
                    )}
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-[200px_1fr_1fr] gap-8'>
                    {/* Avatar */}
                    <div className='flex justify-center items-center'>
                      <div onClick={() => setShowModal(true)} className='relative w-32 h-32 rounded-full border-4 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 cursor-pointer group overflow-hidden flex items-center justify-center transition'>
                        {selectedFileUrl || userData.avatar ? <img src={baseUrl + (selectedFileUrl || userData.avatar)} alt='Avatar' className='object-contain p-2 w-full h-full' /> : <span className='text-4xl font-bold text-blue-400'>{userData.fullName.charAt(0).toUpperCase()}</span>}
                        <div className='absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition'>
                          <svg xmlns='http://www.w3.org/2000/svg' className='w-10 h-10 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* File Upload Modal */}
                    <FileUploadModal
                      show={showModal}
                      onClose={() => setShowModal(false)}
                      onSelect={url => setSelectedFileUrl(url)}
                      onUploadSuccess={newFile => {
                        setUserAssets(prev => [...prev, newFile]);
                      }}
                      existingAssets={userAssets}
                    />

                    {/* Profile Info */}
                    <div className='md:col-span-2 space-y-4'>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <FormGroup label='Full Name' value={userData.fullName} name='fullName' editing={editing} onChange={handleInputChange} />
                        <FormGroup label='Email' value={userData.email} readOnly />
                        <FormGroup label='Phone' value={userData.phone} name='phone' editing={editing} onChange={handleInputChange} />
                        <FormGroup label='Status' value={userData.status} readOnly />
                      </div>
                      <FormGroup label='Address' value={userData.address || 'Not provided'} name='address' editing={editing} onChange={handleInputChange} />
                      <FormGroup label='Business Details' value={userData.businessDetails || 'Not provided'} name='businessDetails' editing={editing} isTextarea onChange={handleInputChange} />
                    </div>
                  </div>
                </section>

                {/* Password Section */}
                <section className='space-y-6 border-t pt-8'>
                  <h2 className='text-2xl font-bold text-gray-800'>Change Password</h2>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <FormGroup editing placeholder='Current Password' label='Current Password' type='password' name='currentPassword' value={passwordData.currentPassword} onChange={handlePasswordChange} />
                    <FormGroup editing placeholder='New Password' label='New Password' type='password' name='newPassword' value={passwordData.newPassword} onChange={handlePasswordChange} />
                    <FormGroup editing placeholder='Confirm New Password' label='Confirm New Password' type='password' name='confirmPassword' value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                  </div>
                  <button onClick={handleChangePassword} disabled={loading} className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50'>
                    {loading ? 'Updating...' : 'Change Password'}
                  </button>
                </section>
              </div>
            ) : (
              // Invitations Section
              <div className='space-y-6'>
                <h2 className='text-2xl font-bold text-gray-800'>Board Invitations</h2>
                {invitations.length === 0 ? <p className='text-gray-500'>You have no pending invitations.</p> : <div className='overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg'>{/* Render Invitations Table Here */}</div>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const SkeletonLoader = () => {
  return (
    <div className='min-h-[90vh] text-text-base  '>
      <div className='px-4 py-4'>
        <div className='bg-white/50 backdrop-blur-md card2  !p-0 shadow rounded-lg overflow-hidden'>
          {/* Tabs Skeleton */}
          <div className='border-b border-gray-200 !mb-4 '>
            <div className='flex my-4 px-4'>
              <div className='py-4 px-6 w-24 bg-gray-200 rounded h-10 mx-2'></div>
              <div className='py-4 px-6 w-24 bg-gray-200 rounded h-10 mx-2'></div>
            </div>
          </div>

          {/* Content Skeleton */}
          <div className='p-6'>
            {/* Profile Section Skeleton */}
            <div className='space-y-8'>
              <div className='space-y-6'>
                <div className='flex justify-between items-center'>
                  <div className='h-8 w-1/4 bg-gray-200 rounded'></div>
                  <div className='h-10 w-24 bg-gray-200 rounded'></div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-[200px,1fr,1fr] gap-6'>
                  {/* Avatar Skeleton */}
                  <div className='space-y-4'>
                    <div className='w-32 h-32 mx-auto rounded-full bg-gray-200'></div>
                  </div>

                  {/* Personal Info Skeleton */}
                  <div className='md:col-span-2 space-y-4'>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                      {[...Array(4)].map((_, i) => (
                        <div key={i}>
                          <div className='h-4 w-1/2 bg-gray-200 rounded mb-2'></div>
                          <div className='h-10 w-full bg-gray-200 rounded'></div>
                        </div>
                      ))}
                    </div>

                    {[...Array(2)].map((_, i) => (
                      <div key={i}>
                        <div className='h-4 w-1/2 bg-gray-200 rounded mb-2'></div>
                        <div className='h-20 w-full bg-gray-200 rounded'></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Change Password Section Skeleton */}
              <div className='space-y-6 border-t border-gray-200 pt-6'>
                <div className='h-8 w-1/4 bg-gray-200 rounded'></div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {[...Array(3)].map((_, i) => (
                    <div key={i}>
                      <div className='h-4 w-1/2 bg-gray-200 rounded mb-2'></div>
                      <div className='h-10 w-full bg-gray-200 rounded'></div>
                    </div>
                  ))}
                </div>
                <div className='h-10 w-40 bg-gray-200 rounded'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


// components/FormGroup.jsx
const FormGroup = ({
  label,
  name,
  value,
  onChange,
  editing = false,
  isTextarea = false,
  type = 'text',
  readOnly = false,
	placeholder
}) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      {editing && !readOnly ? (
        isTextarea ? (
          <textarea
            id={name}
            name={name}
            rows={4}
            value={value || ''}
            onChange={onChange}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value || ''}
            onChange={onChange}
						placeholder={placeholder}
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )
      ) : (
        <div className="p-2 rounded-md bg-gray-100 text-gray-700 min-h-[40px] border border-gray-200">
          {value || <span className="text-gray-400 italic">Not provided</span>}
        </div>
      )}
    </div>
  );
};

