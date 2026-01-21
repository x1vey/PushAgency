"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface TimelineItem {
    id: number;
    title: string;
    date: string;
    content: string;
    category: string;
    icon: any;
    relatedIds: number[];
    status: "completed" | "in-progress" | "pending";
    energy: number;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
    timelineData,
}: RadialOrbitalTimelineProps) {
    const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [autoRotate, setAutoRotate] = useState<boolean>(true);
    const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
    const [centerOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const orbitRef = useRef<HTMLDivElement>(null);
    const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === containerRef.current || e.target === orbitRef.current) {
            setExpandedItems({});
            setActiveNodeId(null);
            setPulseEffect({});
            setAutoRotate(true);
        }
    };

    const toggleItem = (id: number) => {
        setExpandedItems((prev) => {
            const newState = { ...prev };
            Object.keys(newState).forEach((key) => {
                if (parseInt(key) !== id) {
                    newState[parseInt(key)] = false;
                }
            });

            newState[id] = !prev[id];

            if (!prev[id]) {
                setActiveNodeId(id);
                setAutoRotate(false);

                const relatedItems = getRelatedItems(id);
                const newPulseEffect: Record<number, boolean> = {};
                relatedItems.forEach((relId) => {
                    newPulseEffect[relId] = true;
                });
                setPulseEffect(newPulseEffect);
                centerViewOnNode(id);
            } else {
                setActiveNodeId(null);
                setAutoRotate(true);
                setPulseEffect({});
            }

            return newState;
        });
    };

    useEffect(() => {
        let rotationTimer: ReturnType<typeof setInterval>;
        if (autoRotate) {
            rotationTimer = setInterval(() => {
                setRotationAngle((prev) => {
                    const newAngle = (prev + 0.3) % 360;
                    return Number(newAngle.toFixed(3));
                });
            }, 50);
        }
        return () => {
            if (rotationTimer) clearInterval(rotationTimer);
        };
    }, [autoRotate]);

    const centerViewOnNode = (nodeId: number) => {
        const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
        const totalNodes = timelineData.length;
        const targetAngle = (nodeIndex / totalNodes) * 360;
        setRotationAngle(270 - targetAngle);
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angle = ((index / total) * 360 + rotationAngle) % 360;
        const radius = 300;
        const radian = (angle * Math.PI) / 180;
        const x = radius * Math.cos(radian) + centerOffset.x;
        const y = radius * Math.sin(radian) + centerOffset.y;
        const zIndex = Math.round(100 + 50 * Math.cos(radian));
        const opacity = Math.max(0.4, Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2)));
        return { x, y, angle, zIndex, opacity };
    };

    const getRelatedItems = (itemId: number): number[] => {
        const currentItem = timelineData.find((item) => item.id === itemId);
        return currentItem ? currentItem.relatedIds : [];
    };

    const isRelatedToActive = (itemId: number): boolean => {
        if (!activeNodeId) return false;
        const relatedItems = getRelatedItems(activeNodeId);
        return relatedItems.includes(itemId);
    };

    const getStatusStyles = (status: TimelineItem["status"]): string => {
        switch (status) {
            case "completed":
                return "text-white bg-black border-black";
            case "in-progress":
                return "text-black bg-gray-300 border-gray-400";
            case "pending":
                return "text-gray-700 bg-gray-200 border-gray-300";
            default:
                return "text-gray-700 bg-gray-200 border-gray-300";
        }
    };

    return (
        <div
            className="w-full h-[1000px] bg-transparent overflow-hidden relative"
            ref={containerRef}
            onClick={handleContainerClick}
        >
            {/* Absolute center point */}
            <div
                className="absolute left-1/2 top-1/2"
                style={{ transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)` }}
            >
                <div
                    ref={orbitRef}
                    style={{ perspective: "1000px" }}
                    className="relative w-0 h-0"
                >
                    {/* Center Core */}
                    <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black animate-pulse flex items-center justify-center z-10">
                        <div className="absolute w-20 h-20 rounded-full border border-black/20 animate-ping opacity-70"></div>
                        <div className="w-8 h-8 rounded-full bg-white"></div>
                    </div>

                    {/* Orbit Ring */}
                    <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-black/10"></div>

                    {/* Nodes */}
                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isExpanded = expandedItems[item.id];
                        const isRelated = isRelatedToActive(item.id);
                        const isPulsing = pulseEffect[item.id];
                        const Icon = item.icon;

                        const nodeStyle = {
                            transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
                            zIndex: isExpanded ? 200 : position.zIndex,
                            opacity: isExpanded ? 1 : position.opacity,
                        };

                        return (
                            <div
                                key={item.id}
                                ref={(el) => { nodeRefs.current[item.id] = el; }}
                                className="absolute transition-all duration-700 cursor-pointer"
                                style={nodeStyle}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(item.id);
                                }}
                            >
                                <div
                                    className={`absolute rounded-full -inset-1 ${isPulsing ? "animate-pulse" : ""}`}
                                    style={{
                                        background: `radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)`,
                                        width: `${item.energy * 0.4 + 40}px`,
                                        height: `${item.energy * 0.4 + 40}px`,
                                        left: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                                        top: `-${(item.energy * 0.4 + 40 - 40) / 2}px`,
                                    }}
                                ></div>

                                <div
                                    className={`
                    w-10 h-10 rounded-full flex items-center justify-center
                    ${isExpanded ? "bg-black text-white" : isRelated ? "bg-gray-300 text-black" : "bg-gray-200 text-gray-700"}
                    border-2 
                    ${isExpanded ? "border-black shadow-lg shadow-black/10 scale-125" : isRelated ? "border-gray-400 animate-pulse" : "border-gray-300"}
                    transition-all duration-300
                  `}
                                >
                                    <Icon size={18} />
                                </div>

                                <div
                                    className={`
                    absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap
                    text-xs font-semibold tracking-wider
                    transition-all duration-300
                    ${isExpanded ? "text-black scale-110" : "text-gray-600 font-medium"}
                  `}
                                >
                                    {item.title}
                                </div>

                                {isExpanded && (
                                    <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-72 bg-white border-gray-200 shadow-xl overflow-visible text-black rounded-3xl">
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-gray-300"></div>
                                        <CardHeader className="pb-2">
                                            <div className="flex justify-between items-center">
                                                <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                                                    {item.status === "completed" ? "COMPLETE" : item.status === "in-progress" ? "IN PROGRESS" : "PENDING"}
                                                </Badge>
                                                <span className="text-xs font-mono text-white/50">{item.date}</span>
                                            </div>
                                            <CardTitle className="text-sm mt-2 text-black">{item.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="text-xs text-gray-600">
                                            <p>{item.content}</p>

                                            <div className="mt-4 pt-3 border-t border-gray-100">
                                                <div className="flex justify-between items-center text-xs mb-1">
                                                    <span className="flex items-center">
                                                        <Zap size={10} className="mr-1 text-black" />
                                                        Impact Level
                                                    </span>
                                                    <span className="font-mono">{item.energy}%</span>
                                                </div>
                                                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                                    <div
                                                        className="h-full bg-black"
                                                        style={{ width: `${item.energy}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            {item.relatedIds.length > 0 && (
                                                <div className="mt-4 pt-3 border-t border-gray-100">
                                                    <div className="flex items-center mb-2">
                                                        <LinkIcon size={10} className="text-gray-400 mr-1" />
                                                        <h4 className="text-xs uppercase tracking-wider font-medium text-gray-500">
                                                            Connected
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-wrap gap-1">
                                                        {item.relatedIds.map((relatedId) => {
                                                            const relatedItem = timelineData.find((i) => i.id === relatedId);
                                                            return (
                                                                <Button
                                                                    key={relatedId}
                                                                    variant="outline"
                                                                    size="sm"
                                                                    className="flex items-center h-6 px-2 py-0 text-xs rounded border-gray-300 bg-transparent hover:bg-gray-100 text-gray-700 hover:text-gray-900 transition-all"
                                                                    onClick={(e) => {
                                                                        e.stopPropagation();
                                                                        toggleItem(relatedId);
                                                                    }}
                                                                >
                                                                    {relatedItem?.title}
                                                                    <ArrowRight size={8} className="ml-1 text-gray-500" />
                                                                </Button>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

