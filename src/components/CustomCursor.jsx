import { useEffect, useState } from 'react';

const CustomCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [followerPos, setFollowerPos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const followMouse = () => {
            setFollowerPos(prev => ({
                x: prev.x + (position.x - prev.x) * 0.15,
                y: prev.y + (position.y - prev.y) * 0.15,
            }));
            requestAnimationFrame(followMouse);
        };

        const anim = requestAnimationFrame(followMouse);
        return () => cancelAnimationFrame(anim);
    }, [position]);

    return (
        <div className="hidden lg:block">
            <div
                className="custom-cursor"
                style={{ left: `${position.x}px`, top: `${position.y}px` }}
            />
            <div
                className="custom-cursor-follower"
                style={{ left: `${followerPos.x}px`, top: `${followerPos.y}px` }}
            />
        </div>
    );
};

export default CustomCursor;
