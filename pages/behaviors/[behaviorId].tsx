import { Button } from "@material-ui/core";
import { Behavior } from '@prisma/client';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";

function BehaviorPage() {

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
      <div>
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
      </div>
    );
}

export default BehaviorPage;