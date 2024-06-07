const loadTheme = (args) => {
  let selectedTheme = "Material3";
  if (args) {
    args.chart.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
  }
};
export { loadTheme };


  // const [plannedCost, setPlannedCost] = useState("");
  // const [branche, setBranch] = useState("");
  // const [supervisor, setSupervisor] = useState("");
  // const [projectState, setProjectState] = useState("");
  // const [startDate, setStartDate] = useState(null);
  // const [isoStartDate, setIsoStartDate] = useState("");
  // const [endDate, setEndDate] = useState(null);
  // const [isoEndDate, setIsoEndDate] = useState("");

  // const handleChangeProjectState = (event) => {
  //   setProjectState(event.target.value);
  // };
  // const handleResetForm = () => {
  //   setPlannedCost("");
  //   setBranch("");
  //   setSupervisor("");
  //   setProjectState("");
  //   setStartDate(null);
  //   setIsoStartDate("");
  //   setEndDate(null);
  //   setIsoEndDate("");
  // };

  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearch(search);
  //   }, 300);
  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [search]);

  // useEffect(() => {
  //   // dispatch(actGetSupervisors());
  //   // dispatch(actGetBranches());
  //   dispatch(
  //     actGetProjects({
  //       page,
  //       search: debouncedSearch,
  //       status: projectState,
  //       startDate: isoStartDate,
  //       endDate: isoEndDate,
  //       BranchId: branche,
  //       SupervisorId: supervisor,
  //       SpentBudget: plannedCost,
  //     })
  //   );
  // }, [
  //   dispatch,
  //   page,
  //   debouncedSearch,
  //   projectState,
  //   isoStartDate,
  //   isoEndDate,
  //   branche,
  //   supervisor,
  //   plannedCost,
  // ]);



/**
 * 
 * [
    {
      id: 'cd3215dd-4dc8-441c-005f-08dc7ee21558',
      name: 'مالية',
      description: 'ماليه 2023',
      createdAt: '2024-05-28T09:47:46.3592734',
      updatedAt: '2024-05-29T12:00:32.3698791',
      updatedBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb',
      createdBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb'
    },
    {
      id: '2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe',
      name: 'هندسية',
      description: 'هندسية 2023',
      createdAt: '2024-05-28T14:16:58.8999641',
      updatedAt: '2024-05-29T12:00:55.4923748',
      updatedBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb',
      createdBy: 'b37b6f4f-c135-46f6-a28c-fcc444e960cb'
    }
  ]

================================================================
[
    {
        "id": "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
        "name": "mostafa",
        "phone": "01018205801",
        "createdAt": "2024-05-28T09:49:09.3182009",
        "updatedAt": "2024-05-29T12:01:09.9385081",
        "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
        "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
    },
    {
        "id": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
        "name": "ali ",
        "phone": "01018205801",
        "createdAt": "2024-05-28T12:15:19.5268637",
        "updatedAt": "2024-05-28T12:23:24.8224803",
        "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
        "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
    },
    {
        "id": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
        "name": "osama",
        "phone": "01018205801",
        "createdAt": "2024-05-28T14:25:29.735027",
        "updatedAt": "2024-05-29T12:01:46.5021573",
        "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
        "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
    },
    {
        "id": "00aa2310-c106-45af-014a-08dc7fd8978a",
        "name": "samy",
        "phone": "01234574854",
        "createdAt": "2024-05-29T15:12:21.1382722",
        "updatedAt": "0001-01-01T00:00:00",
        "updatedBy": "00000000-0000-0000-0000-000000000000",
        "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
    }
]
=======================================
  

  {
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 1,
    "totalItems": 5,
    "hasPreviousPage": false,
    "hasNextPage": false,
    "data": [
        {
            "id": "07e925c8-589c-44e5-9c16-08dc7ee258c5",
            "name": "sdfwf wef rdf ",
            "description": "asdfsafd",
            "startDate": "2024-05-29T21:00:00",
            "endDate": "2024-05-30T21:00:00",
            "budget": 333.0000,
            "spentBudget": 3433.0000,
            "percentage": 20,
            "status": 4,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
            "createdAt": "2024-05-28T09:49:39.6672683",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
        },
        {
            "id": "66d1ca77-a174-476b-ccc4-08dc7fcbcf3c",
            "name": "werwse",
            "description": "sadfwe3wef",
            "startDate": "2024-05-29T10:38:00.817",
            "endDate": "2024-05-29T10:38:00.817",
            "budget": 2332.0000,
            "spentBudget": 433.0000,
            "percentage": 33,
            "status": 2,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-05-29T13:40:51.1539863",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
        },
        {
            "id": "655330d8-654f-4a23-ccc5-08dc7fcbcf3c",
            "name": "sadsdf arf ",
            "description": "sadf as",
            "startDate": "2024-05-29T10:38:00.817",
            "endDate": "2024-05-29T10:38:00.817",
            "budget": 23.0000,
            "spentBudget": 12.0000,
            "percentage": 34,
            "status": 3,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
            "createdAt": "2024-05-29T13:41:20.3696879",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
        },
        {
            "id": "3ddf2c5e-ba13-4f8e-ccc6-08dc7fcbcf3c",
            "name": "sadsdf arf ",
            "description": "sadf as",
            "startDate": "2024-05-29T10:38:00.817",
            "endDate": "2024-05-29T10:38:00.817",
            "budget": 23.0000,
            "spentBudget": 12.0000,
            "percentage": 34,
            "status": 2,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-05-29T13:41:27.1398059",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
        },
        {
            "id": "20e9ec06-8590-4bb5-ccc7-08dc7fcbcf3c",
            "name": "smal se",
            "description": "sadf as",
            "startDate": "2024-05-29T10:38:00.817",
            "endDate": "2024-05-29T10:38:00.817",
            "budget": 23.0000,
            "spentBudget": 12.0000,
            "percentage": 34,
            "status": 2,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-05-29T13:41:38.3815755",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
        }
    ]
}




 */

