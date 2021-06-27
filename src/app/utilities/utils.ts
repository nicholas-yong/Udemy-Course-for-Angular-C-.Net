export function toBase64(file: File)
{
    return new Promise( (resolve, reject) =>
    {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

export function parseWebAPIErrors( response: any ): string[]
{
    const result: string[] = [];

    console.log(response);

    if(response.error)
    {
        if( typeof response.error === 'string')
        {
            result.push(response.error);

        }
        else if(Array.isArray(response.error))
        {
          response.error.forEach(value => result.push(value.description));
        }
        else
        {
            const mapErrors = response.error.errors;
            const entries = Object.entries(mapErrors)
            entries.forEach((arr: any[]) =>
                {
                    const field = arr[0];
                    arr[1].forEach( errorMesssage =>
                        {
                            result.push(`${field}: ${errorMesssage}`);
                        });
                });
        }
    }

    return result;
}

export function formatDateFormDate(date: Date)
{
  date = new Date(date);
  const format = new Intl.DateTimeFormat('en',
  {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });

  const[
      {value: month},,
      {value: day},,
      {value: year}] = format.formatToParts(date);

  console.log(year);
  console.log(month)
  console.log(day)

  return `${year}-${month}-${day}`
}
