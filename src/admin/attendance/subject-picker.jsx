import * as React from "react"
import { useEffect, useState } from "react"
import axios from "axios"

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"





export function SelectSubject({value, onChange}) {

  const [subjects, setSubjects] = useState([])
  
 useEffect(() => {
  async function fetchSubjects(){
   try {
    const response =  await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/subject/all`)
    setSubjects(response.data)
   } catch (error) {
    console.error(error)
   }
  }
  fetchSubjects();
 
 }, [])
 

  return (
    <Select value={value} onValueChange={onChange}>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select Subject" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Subjects</SelectLabel>
      {subjects.map((subject) => (
        <SelectItem key={subject.subjectId} value={subject.subjectId}>
          {subject.subjectName}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>

  )
}
