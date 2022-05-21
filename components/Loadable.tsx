import classNames from 'classnames';
import React from 'react';

interface LoadableProps {
    loading?: boolean;
    children: React.ReactChild | React.ReactChild[];
    className?: string;
}

export default function Loadable(props: LoadableProps) {
    if (props.loading) {
        return <div className={classNames("bg-gray-300 w-40 h-24 animate-pulse", props.className)}></div>
    } else {
        return props.children;
    }
}