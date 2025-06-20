import SearchBar from './UI/SearchBar';
import UserAvatar from './UI/Avatar';
import NotificationBell from './UI/NotificationBell';

export default function BoardHeader({ 
  boardTitle, 
  currentUser, 
  unreadNotifications,
  onSearch,
  onFilterClick,
  onNotificationsClick 
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      <div className="flex items-center">
        <h1 className="text-2xl font-bold">{boardTitle}</h1>
        <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded">Team</span>
      </div>
      
      <div className="flex items-center space-x-4">
        <SearchBar onSearch={onSearch} />
        
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={onFilterClick}
        >
          Filters
        </button>
        
        <NotificationBell 
          count={unreadNotifications} 
          onClick={onNotificationsClick}
        />
        
        <UserAvatar user={currentUser} showName />
      </div>
    </div>
  );
}