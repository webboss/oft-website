import { parseISO, format } from 'date-fns'
import { useEffect } from 'react'

export default function Date({ dateString }) {
  const date = parseISO(dateString)

  useEffect(()=>{
    console.log(date)
  },[])
  
  return <time dateTime={dateString}>{format(date, 'LLLL	d, yyyy')}</time>
}
