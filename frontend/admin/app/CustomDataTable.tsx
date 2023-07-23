import {DataTable} from "@/app/data-table";
import {CountryColumns} from "@/app/columns";
import {DEFAULTS} from "@/app/defaults";
import axios from "axios";


export default async function CustomDataTable(
    endpoint: string,
    params: object = {},
    limit: number = DEFAULTS.LIMIT,
    page: number = DEFAULTS.PAGE,
) {

    const axios = require('axios');

    const urlParams = new URLSearchParams({
        ...params,
        __limit: limit.toString(),
        __page: page.toString(),
    });

    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://localhost/${endpoint}?${urlParams.toString()}`,
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6eyJpZCI6MiwiY29kZSI6ImN1c3RvbWVyIiwicGVybWlzc2lvbnMiOltdfSwiY3VzdG9tZXIiOnsiaWQiOjEsImN1c3RvbWVyQ3VzdG9tRGF0YSI6ImN1c3RvbSIsImNyZWF0ZWRBdCI6IjIwMjMtMDctMjBUMTM6NTg6MzUuNzAyWiIsInVwZGF0ZWRBdCI6IjIwMjMtMDctMjBUMTM6NTg6MzUuNzAyWiIsInVzZXJJZCI6MX0sImlhdCI6MTY5MDEyNzQzNSwiZXhwIjoxNjkwMTMxMDM1fQ.S5-LGzySQlpgqmXMh5_cv1_WoYF97JN-okgPW_IABvE'
        }
    };

    try {
        const response = await axios.request(config);

        return (
            <div className="container mx-auto py-10">
                <DataTable
                    columns={CountryColumns}
                    data={response.data.data.items}
                    totalPages={response.data.data.totalPages}
                    currentPage={response.data.data.currentPage}
                    limit={DEFAULTS.LIMIT}
                    page={DEFAULTS.PAGE}
                />
            </div>
        )

    } catch (error) {
        console.log(error);
    }
    return (<> </>)
}