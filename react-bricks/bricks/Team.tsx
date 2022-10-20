import React from 'react'
import { Text, RichText, Image, Repeater, types } from 'react-bricks'

//=============================
// Local Types
//=============================

interface TeamProps {
    paddingY: Number
    bgColor: types.IColor,
    tagName: String,
    tagColor: types.IColor
}

//=============================
// Component to be rendered
//=============================
const Team: types.Brick<TeamProps> = ({ paddingY, bgColor, tagName, tagColor }) => {
    return (
        <div
            className={`max-w-5xl mx-auto px-4 ${bgColor?.className}`}
            style={{ paddingTop: `${paddingY}rem`, paddingBottom: `${paddingY}rem` }}
        >
            <Text
                propName="title"
                placeholder="Title..."
                renderBlock={({ children }) => (
                    <h1 className="text-5xl text-gray-900 text-center font-black mb-4 dark:text-white">
                        {children}
                    </h1>
                )}
            />
            <span style={{ backgroundColor: `${tagColor.color}` }}>{tagName}</span>
            <RichText
                propName="text"
                placeholder="Text..."
                renderBlock={({ children }) => (
                    <h2 className="text-2xl text-gray-500 text-center mb-8 dark:text-gray-400">
                        {children}
                    </h2>
                )}
                allowedFeatures={[types.RichTextFeatures.Highlight]}
                renderHighlight={({ children }) => (
                    <span className="font-bold text-pink-500">{children}</span>
                )}
            />
            <div className="flex flex-col items-center sm:flex-row flex-wrap">
                <Repeater propName="members" />
            </div>
        </div>
    )
}

//=============================
// Brick Schema
//=============================
Team.schema = {
    name: 'team-ws',
    category: 'Workshop',
    tags: ['team', 'about-us'],
    label: 'Team',
    getDefaultProps: () => ({
        title: 'Our Team',
        text: 'Our team is great and lorem ipsum dolor sit amet.',
        paddingY: 2,
        tagColor: { color: '#fff' },
        bgColor: { color: '#fff' },
    }),
    repeaterItems: [
        {
            name: 'members',
            itemType: 'team-member-ws',
            itemLabel: 'Member',
            max: 6,
        },
    ],
    sideEditProps: [
        {
            name: 'paddingY',
            label: 'Vertical Padding',
            type: types.SideEditPropType.Range,
            rangeOptions: {
                min: 0,
                max: 3,
                step: 1,
            },
        },
        {
            name: 'tagName',
            label: 'Tag',
            type: types.SideEditPropType.Text,

        },
        {
            name: 'tagColor',
            label: 'Tag Color',
            type: types.SideEditPropType.Select,
            selectOptions: {
                display: types.OptionsDisplay.Color,
                options: [
                    {
                        value: { color: '#fff', className: 'bg-white dark:bg-gray-900' },
                        label: 'White',
                    },
                    {
                        value: {
                            color: '#f7fee7',
                            className: 'bg-green-50 dark:bg-gray-900',
                        },
                        label: 'Green',
                    },
                ],
            },
        },
        {
            name: 'bgColor',
            label: 'Background',
            type: types.SideEditPropType.Select,
            selectOptions: {
                display: types.OptionsDisplay.Color,
                options: [
                    {
                        value: { color: '#fff', className: 'bg-white dark:bg-gray-900' },
                        label: 'White',
                    },
                    {
                        value: {
                            color: '#f7fee7',
                            className: 'bg-green-50 dark:bg-gray-900',
                        },
                        label: 'Green',
                    },
                ],
            },
        },
    ],
}

export default Team