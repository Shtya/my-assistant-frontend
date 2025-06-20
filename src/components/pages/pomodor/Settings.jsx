// 'use client';

// import { useEffect, useState } from 'react';
// import { Settings } from 'lucide-react';
// import { Switch } from '@/components/atoms/Switch';
// import { Label } from '@/components/atoms/Label';
// import { Slider } from '@/components/atoms/Slider';
// import Button from '@/components/atoms/Button';
// import Dialog from '@/components/molecules/Dialog';
// import Input from '@/components/atoms/Input';
// import Select from '@/components/atoms/Select';
// import ChooseImage from './ChooseImage';
// import { useApi } from '@/helper/useApi';

// export default function Setting() {
// 	const [open, setOpen] = useState(false);
// 	const { loading , data } = useApi('/pomodoro/settings', {
// 		successMsg: 'Pomodoro settings loaded!',
// 		errorMsg: 'Failed to fetch settings.',
// 	});

// 	const { loading : loadingAssets , data : dataAssets } = useApi('/assets?type=other' );

// 	const sounds = [
// 		{ key: 'chime', label: 'Chime' },
// 		{ key: 'bell', label: 'Bell' },
// 		{ key: 'soft_ping', label: 'Soft Ping' },
// 		{ key: 'digital_ding', label: 'Digital Ding' },
// 	];

// 	// State
// 	const [soundEnabled, setSoundEnabled] = useState(true);
// 	const [blockPc, setBlockPc] = useState(false);
// 	const [selectedSound, setSelectedSound] = useState(sounds[0]);
// 	const [notificationsEnabled, setNotificationsEnabled] = useState(true);
// 	const [autoStart, setAutoStart] = useState(false);
// 	const [focusMode, setFocusMode] = useState(false);
// 	const [volume, setVolume] = useState(60);
// 	const [pomodoro, setPomodoro] = useState(25);
// 	const [shortBreak, setShortBreak] = useState(5);
// 	const [longBreak, setLongBreak] = useState(15);
// 	const [roundsBeforeLongBreak, setRoundsBeforeLongBreak] = useState(4);
// 	const [bgImage, setBgImage] = useState('');

// 	// Hydrate state from fetched data
// 	useEffect(() => {
// 		if (data) {
// 			setPomodoro(data.pomodoroDuration);
// 			setShortBreak(data.shortBreakDuration);
// 			setLongBreak(data.longBreakDuration);
// 			setRoundsBeforeLongBreak(data.roundsBeforeLongBreak);
// 			setSoundEnabled(data.soundEnabled);
// 			setSelectedSound(sounds.find(s => s.key === data.defaultSound) || sounds[0]);
// 			setNotificationsEnabled(data.desktopNotifications);
// 			setVolume(data.volume);
// 			setAutoStart(data.autoStartNextSession);
// 			setBlockPc(data.blockPCDuringBreaks);
// 			setFocusMode(data.focusMode);
// 			setBgImage(data.backgroundTheme);
// 		}
// 	}, [data]);

// 	return (
// 		<div>
// 			<Button Icon={<Settings size={20} />} color='white' onClick={() => setOpen(true)} />

// 			<Dialog title='Settings' open={open} onClose={() => setOpen(false)}>
// 				<div className='space-y-6 text-sm text-text-base p-2 sm:p-4'>
// 					{/* Timer Settings */}
// 					<div>
// 						<h3 className='font-semibold text-primary mb-6'>⏱ Timer Settings</h3>
// 						<div className='grid grid-cols-2 gap-4'>
// 							{loading ? (
// 								<>
// 									<Skeleton height={40} />
// 									<Skeleton height={40} />
// 									<Skeleton height={40} />
// 									<Skeleton height={40} />
// 								</>
// 							) : (
// 								<>
// 									<Input label='Pomodoro' type='number' value={pomodoro} onChange={setPomodoro} unite='min' min={5} max={90} />
// 									<Input label='Short Break' type='number' value={shortBreak} onChange={setShortBreak} unite='min' min={1} max={30} />
// 									<Input label='Long Break' type='number' value={longBreak} onChange={setLongBreak} unite='min' min={5} max={60} />
// 									<Input label='Rounds Before Long' type='number' value={roundsBeforeLongBreak} onChange={setRoundsBeforeLongBreak} min={1} max={10} />
// 								</>
// 							)}
// 						</div>
// 					</div>

// 					{/* Sound & Notifications */}
// 					<div>
// 						<h3 className='font-semibold text-primary mb-2'>🔊 Sound & Notifications</h3>
// 						<div className='space-y-3'>
// 							<div className='flex items-center justify-between'>
// 								<Label>Enable Sound Alerts</Label>
// 								<Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
// 							</div>
// 							{soundEnabled && (
// 								loading ? (
// 									<Skeleton height={40} />
// 								) : (
// 									<Select label='Default Sound' options={sounds} value={selectedSound} onChange={setSelectedSound} />
// 								)
// 							)}

// 							<div className='flex !mt-8 items-center justify-between'>
// 								<Label>Desktop Notifications</Label>
// 								<Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
// 							</div>
// 							<div className='flex items-center justify-between gap-[40px]'>
// 								<Label className='mb-1 block'>Volume</Label>
// 								{loading ? <Skeleton width={150} height={10} /> : <Slider value={[volume]} onValueChange={([val]) => setVolume(val)} max={100} step={5} />}
// 							</div>
// 						</div>
// 					</div>

// 					{/* Focus Settings */}
// 					<div>
// 						<h3 className='font-semibold text-primary mb-2'>🧠 Focus Settings</h3>
// 						<div className='space-y-3'>
// 							<div className='flex items-center justify-between'>
// 								<Label>Auto-start next session</Label>
// 								<Switch checked={autoStart} onCheckedChange={setAutoStart} />
// 							</div>

// 							<div className='flex items-center justify-between'>
// 								<Label>Block PC usage during breaks</Label>
// 								<Switch checked={blockPc} onCheckedChange={setBlockPc} />
// 							</div>

// 							<div className='flex items-center justify-between'>
// 								<Label>Focus Mode (Lock Tasks)</Label>
// 								<Switch checked={focusMode} onCheckedChange={setFocusMode} />
// 							</div>
// 						</div>
// 					</div>

// 					{/* Background Picker */}
// 					<ChooseImage currentImage={bgImage} onChange={setBgImage} />
// 				</div>
// 			</Dialog>
// 		</div>
// 	);
// }

// function Skeleton({ height = 'h-10', width = 'w-full', rounded = 'rounded-lg' }) {
//     return (
//         <div className={`animate-pulse bg-muted ${height} ${width} ${rounded}`} />
//     );
// }

'use client';

import { useEffect, useState } from 'react';
import { Settings } from 'lucide-react';
import { Switch } from '@/components/atoms/Switch';
import { Label } from '@/components/atoms/Label';
import { Slider } from '@/components/atoms/Slider';
import Button from '@/components/atoms/Button';
import Dialog from '@/components/molecules/Dialog';
import Input from '@/components/atoms/Input';
import Select from '@/components/atoms/Select';
import ChooseImage from './ChooseImage';

const soundOptions = [
    { key: '/sounds/alert/1.wav', label: 'Chime' },
    { key: '/sounds/alert/2.mp3', label: 'Bell' },
    { key: '/sounds/alert/3.mp3', label: 'Soft Ping' },
    { key: '/sounds/alert/4.mp3', label: 'Digital Ding' },
];

export default function Setting({ initialSettings, onSettingsChange }) {
    const [open, setOpen] = useState(false);
    const [settings, setSettings] = useState(initialSettings);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setSettings(initialSettings);
    }, [initialSettings]);

    const handleSave = () => {
        setIsLoading(true);
        try {
            onSettingsChange(settings);
            setOpen(false);
            toast.success('Settings saved successfully!');
        } catch (error) {
            toast.error('Failed to save settings');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <Button Icon={<Settings size={20} />} color='white' onClick={() => setOpen(true)} />

            <Dialog
                title='Settings'
                open={open}
                onClose={() => setOpen(false)}
                actions={
                    <>
                        <Button label='Cancel' color='white' onClick={() => setOpen(false)} />
                        <Button label='Save' onClick={handleSave} loading={isLoading} />
                    </>
                }>
                <div className='space-y-6 text-sm text-text-base p-2 sm:p-4'>
                    {/* Timer Settings */}
                    <div>
                        <h3 className='font-semibold text-primary mb-6'>⏱ Timer Settings</h3>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input label='Pomodoro' type='number' value={settings.pomodoroDuration || 25} onChange={val => setSettings({ ...settings, pomodoroDuration: val })} unit='min' min={5} max={90} />
                            <Input label='Short Break' type='number' value={settings.shortBreakDuration || 5} onChange={val => setSettings({ ...settings, shortBreakDuration: val })} unit='min' min={1} max={30} />
                            <Input label='Long Break' type='number' value={settings.longBreakDuration || 15} onChange={val => setSettings({ ...settings, longBreakDuration: val })} unit='min' min={5} max={60} />
                            <Input label='Idle Reminder' type='number' value={settings.idleReminderInterval ? settings.idleReminderInterval / (60 * 1000) : 5} onChange={val => setSettings({ ...settings, idleReminderInterval: val * 60 * 1000 })} unit='min' min={1} max={30} />
                        </div>
                    </div>

                    {/* Sound & Notifications */}
                    <div>
                        <h3 className='font-semibold text-primary mb-2'>🔊 Sound & Notifications</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Enable Sound Alerts</Label>
                                <Switch checked={settings.soundEnabled} onCheckedChange={val => setSettings({ ...settings, soundEnabled: val })} />
                            </div>

                            <Select label='Default Sound' options={soundOptions} value={soundOptions.find(s => s.key === settings.sound) || soundOptions[0]} onChange={val => setSettings({ ...settings, sound: val.key })} />

                            <div className='flex items-center justify-between'>
                                <Label>Desktop Notifications</Label>
                                <Switch checked={settings.notificationEnabled} onCheckedChange={val => setSettings({ ...settings, notificationEnabled: val })} />
                            </div>

                            <div className='flex items-center justify-between gap-[40px]'>
                                <Label className='mb-1 block'>Volume</Label>
                                <Slider value={[settings.volume || 60]} onValueChange={([val]) => setSettings({ ...settings, volume: val })} max={100} step={5} />
                            </div>
                        </div>
                    </div>

                    {/* Auto Start Settings */}
                    <div>
                        <h3 className='font-semibold text-primary mb-2'>⚡ Auto Start</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Auto-start breaks</Label>
                                <Switch checked={settings.autoStartBreaks} onCheckedChange={val => setSettings({ ...settings, autoStartBreaks: val })} />
                            </div>

                            <div className='flex items-center justify-between'>
                                <Label>Auto-start pomodoros</Label>
                                <Switch checked={settings.autoStartPomodoros} onCheckedChange={val => setSettings({ ...settings, autoStartPomodoros: val })} />
                            </div>
                        </div>
                    </div>

                    {/* Idle Reminders */}
                    <div>
                        <h3 className='font-semibold text-primary mb-2'>🕰 Idle Reminders</h3>
                        <div className='space-y-3'>
                            <div className='flex items-center justify-between'>
                                <Label>Enable idle reminders</Label>
                                <Switch checked={settings.idleReminderEnabled} onCheckedChange={val => setSettings({ ...settings, idleReminderEnabled: val })} />
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </div>
    );
}
