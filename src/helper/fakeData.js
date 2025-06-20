import { CheckCircle, Clock, AlertCircle, PauseCircle } from 'lucide-react';

export const routinesData = [
    {
    id: 13,
    title: 'Check Sugar Level',
    timeStart: '2025-06-19T22:12:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['17:45'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '23:00',
      },
    },
  },

  {
    id: 1,
    title: 'Morning Medication',
    timeStart: '2025-06-19T11:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['08:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '20:00',
      },
    },
  },
  {
    id: 2,
    title: 'Vitamin D Supplement',
    timeStart: '2025-06-15T12:30:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['12:30'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 6,
        endTime: '22:00',
      },
    },
  },
  {
    id: 3,
    title: 'Blood Pressure Check',
    timeStart: '2025-06-15T18:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['18:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 5,
        endTime: '21:00',
      },
    },
  },
  {
    id: 4,
    title: 'Lunch Insulin',
    timeStart: '2025-06-16T12:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['12:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '20:00',
      },
    },
  },
  {
    id: 5,
    title: 'Afternoon Walk',
    timeStart: '2025-06-16T16:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['16:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 6,
        endTime: '22:00',
      },
    },
  },
  {
    id: 6,
    title: 'Take Eye Drops',
    timeStart: '2025-06-16T20:30:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['20:30'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '23:00',
      },
    },
  },
  {
    id: 7,
    title: 'Evening Tea',
    timeStart: '2025-06-17T06:55:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['18:45'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 3,
        endTime: '23:00',
      },
    },
  },
  {
    id: 8,
    title: 'Dinner Medication',
    timeStart: '2025-06-17T21:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['21:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 3,
        endTime: '23:30',
      },
    },
  },
  {
    id: 9,
    title: 'Stretching Routine',
    timeStart: '2025-06-17T07:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['07:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 5,
        endTime: '22:00',
      },
    },
  },
  {
    id: 10,
    title: 'Night Pill',
    timeStart: '2025-06-17T22:15:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['22:15'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '23:59',
      },
    },
  },
  {
    id: 11,
    title: 'Water Reminder',
    timeStart: '2025-06-18T09:30:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['09:30'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 2,
        endTime: '21:00',
      },
    },
  },
  {
    id: 12,
    title: 'Breathing Exercise',
    timeStart: '2025-06-18T14:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['14:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 3,
        endTime: '22:00',
      },
    },
  },
  
  {
    id: 14,
    title: 'Multivitamin',
    timeStart: '2025-06-19T08:15:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['08:15'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 6,
        endTime: '22:00',
      },
    },
  },
  {
    id: 15,
    title: 'Warm-up Exercise',
    timeStart: '2025-06-19T10:45:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['10:45'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '21:00',
      },
    },
  },
  {
    id: 16,
    title: 'Skin Cream',
    timeStart: '2025-06-19T22:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['22:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 3,
        endTime: '23:59',
      },
    },
  },
  {
    id: 17,
    title: 'Protein Shake',
    timeStart: '2025-06-20T07:30:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['07:30'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 5,
        endTime: '20:00',
      },
    },
  },
  {
    id: 18,
    title: 'Relaxation Time',
    timeStart: '2025-06-20T16:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['16:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 6,
        endTime: '23:00',
      },
    },
  },
  {
    id: 19,
    title: 'Magnesium Supplement',
    timeStart: '2025-06-21T09:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['09:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '20:00',
      },
    },
  },
  {
    id: 20,
    title: 'Final Medication',
    timeStart: '2025-06-21T20:00:00',
    status: 'pending',
    repeat: {
      type: 'interval',
      interval: 1,
      times: ['20:00'],
      repeatWithinDay: {
        enabled: true,
        intervalHours: 4,
        endTime: '23:00',
      },
    },
  },
];



export const days = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
export const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const statusIcons = {
    pending: <Clock className='w-4 h-4 inline-block mr-1' />,
    completed: <CheckCircle className='w-4 h-4 inline-block mr-1' />,
    missed: <AlertCircle className='w-4 h-4 inline-block mr-1' />,
    snooze: <PauseCircle className='w-4 h-4 inline-block mr-1' />,
};

export const statusBg = {
    pending: '!bg-warning !text-black/50',
    completed: '!bg-success !text-white',
    missed: '!bg-error !text-white',
    snooze: '!bg-blue-100 !text-blue-800',
};

export const statusColorUncheckd = {
    pending: '!text-black/50',
    completed: '!text-white',
    missed: '!text-white',
    snooze: '!text-blue-800',
};
