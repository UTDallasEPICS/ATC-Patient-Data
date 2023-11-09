import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { Button } from "@material-ui/core";
import CheckUser from "../../auth0CheckUser";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Behavior } from '@prisma/client';

function BehaviorPage() {
    // Verifies if user has the correct permissions
    const {allowed, role} = CheckUser(["Admin", "BCBA"])
    if(!allowed) return(<div>Redirecting...</div>);

    const router = useRouter();
    const { behaviorId } = router.query;

    const [behaviorData, setBehaviorData] = useState<Behavior | []>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/behavior?id=${behaviorId}`, { method: 'GET' });
                if (response.ok) {
                    const data: Behavior = await response.json();
                    setBehaviorData(data);
                } else {
                    console.error('Failed to fetch data:', response.status, response.statusText);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [])
    
    return (
        <>
            <Head>
                <title>Behavior</title>
                <link rel="icon" href="/atc-logo.png" />
            </Head>
            <Navbar pageTitle={behaviorData.name} role={role}>
                <Link href="/behaviors/manage">
                    <Button variant="contained" color="secondary">
                        Back to Manage Behaviors
                    </Button>
                </Link>
                <div style={{ marginTop: "3rem" }}>
                    <h1>Behavior Name: {behaviorData.name}</h1>
                    <p>Description: {behaviorData.description}</p>
                    <p>Behavior Type: {behaviorData.datatype}</p>
                </div>
            </Navbar>
        </>
    );
}

export default BehaviorPage;
