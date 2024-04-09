import { Button, FormHelperText, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Behavior } from '@prisma/client';
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import { FormControl } from "@mui/material";

function BehaviorPage() {

    const router = useRouter();
    const { behaviorId } = router.query;
    const [behaviorData, setBehaviorData] = useState<Behavior | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(`/api/behavior?id=${behaviorId}`, { method: 'PUT' });
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
    export default function addBehavior(): JSX.Element {
      const [behaviorData, setBehaviorData] = useState({
          behaviorName: "",
          description: "",
          datatype: "",
      });
      const router = useRouter();
      const { behaviorId } = router.query;
      const [behaviorData, setBehaviorData] = useState<Behavior | []>([])
    }
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
      
  
      const submitForm = async (): Promise<void> => {
          if (
              behaviorData.behaviorName.length === 0 ||
              behaviorData.description.length === 0
          ) {
              return;
          }
          await fetch("http://localhost:3000/api/behavior/", {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: behaviorData.behaviorName,
                  description: behaviorData.description,
                  datatype: behaviorData.datatype.toUpperCase(),
              }),
          });
  
          setBehaviorData({
              behaviorName: "",
              description: "",
              datatype: "",
          });
  
          router.push("/behaviors/manage");
      };
  
      return (
        <><div style={{ padding: "1rem 2rem 1rem 2rem" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">
              Behavior Name
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={behaviorData.behaviorName}
              onChange={(e) => setBehaviorData({
                ...behaviorData,
                behaviorName: e.target.value,
              })} />
            <FormHelperText id="my-helper-text">
              Enter the name of your behavior here
            </FormHelperText>
          </FormControl>
          <FormControl
            fullWidth
            style={{ marginTop: "1rem", marginBottom: "1rem" }}
          >
            <InputLabel htmlFor="my-input">
              Behavior Description
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={behaviorData.description}
              onChange={(e) => setBehaviorData({
                ...behaviorData,
                description: e.target.value,
              })} />
            <FormHelperText id="my-helper-text">
              Enter the description of your behavior here
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth style={{ marginBottom: "1rem" }}>
            <InputLabel id="demo-simple-select-label">
              Behavior Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={behaviorData.datatype}
              onChange={(e) => {
                setBehaviorData((prev) => ({
                  ...prev,
                  datatype: e.target.value as string,
                }));
              } }
            >
              <MenuItem value="" disabled>
                Choose a behavior type
              </MenuItem>
              <MenuItem value="trial">Trial</MenuItem>
              <MenuItem value="probe">Probe</MenuItem>
              <MenuItem value="duration">Duration</MenuItem>
              <MenuItem value="frequency">Frequency</MenuItem>
            </Select>
            <FormHelperText id="my-helper-text">
              Choose a behavior type
            </FormHelperText>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              submitForm();
            } }
          >
            Submit
          </Button>
        </div><div>
            <Link href="/behaviors/manage">
              <Button variant="contained" color="secondary">
                Back to Manage Behaviors
              </Button>
            </Link>
            <div style={{ marginTop: "3rem" }}>
              <h1>Behavior Name: {behaviorData?.name}</h1>
              <p>Description: {behaviorData?.description}</p>
              <p>Behavior Type: {behaviorData?.datatype}</p>
            </div>
          </div></>
      );
  }


export default BehaviorPage;