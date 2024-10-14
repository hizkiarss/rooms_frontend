"use client"
import React, { useState, useEffect } from 'react';

const Navigation = () => {
    const [activeSection, setActiveSection] = useState('overview');
    const sections = ['overview', 'rooms', 'review', 'description'];

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.9,
        };

        const observerCallback = (entries:  IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const handleClick = (section: string) => {
        setActiveSection(section);
        const element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <nav className="text-xs md:text-base flex justify-between border-b border-slate-300 pt-3 sticky top-0 bg-white z-50">
            <div className="flex gap-6 md:gap-12">
                {sections.map((section) => (
                    <button
                        key={section}
                        className={`font-semibold ${
                            activeSection === section
                                ? "border-b-2 border-greenr text-greenr"
                                : "text-black"
                        } pb-3`}
                        onClick={() => handleClick(section)}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default Navigation;