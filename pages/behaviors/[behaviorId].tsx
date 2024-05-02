import { Button, FormHelperText, Input, InputLabel, MenuItem, Select } from "@material-ui/core";
import { Behavior, Datatype } from '@prisma/client';
import Head from "next/head";
import Link from "next/link";
import router, { useRouter } from 'next/router';
import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar";
import { FormControl } from "@mui/material";
async function BehaviorPage() {

    const router = useRouter();
    const { behaviorId } = router.query;
    const [behaviorData, setBehaviorData] = useState<Behavior | null>(null)

    useEffect(() => {
      const fetchData = async () => {
        // TODO: if behavior id is zero, then we dont need to do a network request
        // we can just make an empty behavior (with any sensible defaults)
        if(behaviorId == "0"){
          setBehaviorData({ name: "", description: "",datatype: Datatype.TRIAL,  id: null, trialsPerEntry: 0, entries: [], tags: [] });
        }
        else{
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
        }
      };
      fetchData();
    }, [behaviorId]);
      
  
      const submitForm = async (): Promise<void> => {
          if (
              behaviorData.name.length === 0 ||
              behaviorData.description.length === 0
          ) {
              return;
          }
          // TODO: if behavior id is not zero, then we need to 
          // make a PUT request to update the behvaior with that id, else
          // POSt to create new 
          if(behaviorId != "0"){
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
          }
          else{
            try {
              const response = await fetch(`/api/behavior?id=${behaviorId}`, { method: 'POST' });
              if (response.ok) {
                  const data: Behavior = await response.json();
                  setBehaviorData(data);
              } else {
                  console.error('Failed to fetch data:', response.status, response.statusText);
              }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
          }
      }
          await fetch("http://localhost:3000/api/behavior/", {
              method: "POST",
              mode: "cors",
              headers: {
                  "Content-Type": "application/json",
              },
              body: JSON.stringify({
                  name: behaviorData .name,
                  description: behaviorData.description,
                  datatype: behaviorData.datatype.toUpperCase(),
              }),
          });
  
          setBehaviorData({
              name: "",
              description: "",
              id: 0,
              trialsPerEntry: null, 
              entries:[], 
              tags:[],
              datatype: Datatype.TRIAL,
          });
  
          router.push("/behaviors/manage");
  
      return (
        <><div style={{ padding: "1rem 2rem 1rem 2rem" }}>
          <FormControl fullWidth>
            <InputLabel htmlFor="my-input">
              Behavior Name
            </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              value={behaviorData.name}
              onChange={(e) => setBehaviorData({
                ...behaviorData,
                name: e.target.value,
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
                  datatype: Object.values(Datatype).find((dt) => dt === e.target.value) ,
                }));
              }}
              
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