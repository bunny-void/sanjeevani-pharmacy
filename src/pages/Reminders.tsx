import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Bell, Plus, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

interface ReminderForm {
  medicineName: string;
  dosage: string;
  time: string;
  frequency: string;
}

export function Reminders() {
  const { reminders, addReminder } = useStore();
  const [showForm, setShowForm] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ReminderForm>();

  const onSubmit = (data: ReminderForm) => {
    addReminder({
      id: Math.random().toString(),
      ...data,
      active: true
    });
    
    // Attempt local notification
    if ('Notification' in window && Notification.permission === 'granted') {
       new Notification('Reminder Set', { body: `We'll remind you to take ${data.medicineName} at ${data.time}` });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
       Notification.requestPermission();
    }

    reset();
    setShowForm(false);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medication Reminders</h1>
          <p className="text-gray-500">Never miss a dose again</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="flex items-center gap-2">
          {showForm ? 'Cancel' : <><Plus className="w-4 h-4" /> Add Reminder</>}
        </Button>
      </div>

      {showForm && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-primary-100 mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                <Input {...register('medicineName', { required: 'Required' })} placeholder="e.g. Paracetamol" />
                {errors.medicineName && <span className="text-red-500 text-xs mt-1">{errors.medicineName.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage *</label>
                <Input {...register('dosage', { required: 'Required' })} placeholder="e.g. 1 Tablet (500mg)" />
                {errors.dosage && <span className="text-red-500 text-xs mt-1">{errors.dosage.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time *</label>
                <Input type="time" {...register('time', { required: 'Required' })} />
                {errors.time && <span className="text-red-500 text-xs mt-1">{errors.time.message}</span>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Frequency *</label>
                <select 
                  {...register('frequency', { required: 'Required' })}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="Daily">Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As Needed">As Needed</option>
                </select>
                {errors.frequency && <span className="text-red-500 text-xs mt-1">{errors.frequency.message}</span>}
              </div>
            </div>
            <Button type="submit" className="w-full mt-4">Save Reminder</Button>
          </form>
        </div>
      )}

      {reminders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <Bell className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reminders active</h3>
          <p className="text-gray-500">Add a reminder to get notified when it's time to take your medicine.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-start">
              <div>
                <div className="font-bold text-gray-900 text-lg mb-1">{reminder.medicineName}</div>
                <div className="text-sm text-gray-600 mb-3">{reminder.dosage} • {reminder.frequency}</div>
                <div className="inline-flex items-center gap-1.5 bg-primary-50 text-primary-700 px-2 py-1 rounded text-sm font-medium">
                  <Bell className="w-4 h-4" /> {reminder.time}
                </div>
              </div>
              <button className="text-gray-400 hover:text-red-500 transition-colors p-2">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
