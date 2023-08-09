import { Card } from "antd";
import { useState } from "react";

export default function CardComp({ title, desc }) {
    return (
        <Card
            title={title}
            bordered={true}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
        </Card>
    );
}
