const loadTheme = (args) => {
  let selectedTheme = "Material3";
  if (args) {
    args.chart.theme =
      selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1);
  }
};
export { loadTheme };

/**
 * {
    "currentPage": 1,
    "pageSize": 10,
    "totalPages": 3,
    "totalItems": 26,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "data": [
        {
            "id": "0086caa3-98cc-4684-0a16-08dc860d856c",
            "name": "مشروع زراعة 200 الف فدان",
            "description": "مشروع مخصص لزراعة 200 الف فدان بقطاع الضبعه بوابة السعودية",
            "startDate": "2024-06-11T09:41:39",
            "endDate": "2030-06-12T09:41:39",
            "budget": 12.0000,
            "spentBudget": 16.6540,
            "percentage": 0,
            "status": 1,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-06-06T12:46:21.0433953",
            "updatedAt": "2024-06-08T15:03:33.5053946",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9",
            "risks": [],
            "handicaps": [
                {
                    "id": "0a47762e-5232-473f-ee01-08dc860d85c0",
                    "description": "صعوبة وصول الماء في تلك الاماكن ",
                    "status": 2,
                    "projectId": "0086caa3-98cc-4684-0a16-08dc860d856c",
                    "createdAt": "2024-06-06T12:46:21.6409232",
                    "updatedAt": "2024-06-08T15:02:46.7678719",
                    "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
                    "createdBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9"
                }
            ]
        },
        {
            "id": "8c326979-c466-44b1-99d7-08dc82f844c3",
            "name": "ggggسبلنسبكي",
            "description": "OTyVEaRtbXNlwZepRVRIeCHILlTnBbZkiOcQWURziiamxxr",
            "startDate": "2024-06-08T12:21:09.666",
            "endDate": "2024-06-08T12:21:09.666",
            "budget": 0.0000,
            "spentBudget": 0.0000,
            "percentage": 0,
            "status": 1,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-06-02T14:36:49.4900121",
            "updatedAt": "2024-06-08T15:07:58.0196418",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [
                {
                    "id": "4d40f13c-d3c8-42dd-c484-08dc87a15ac2",
                    "description": "هذه مخاطر",
                    "status": 2,
                    "projectId": "8c326979-c466-44b1-99d7-08dc82f844c3",
                    "createdAt": "2024-06-08T12:57:06.1892406",
                    "updatedAt": "2024-06-08T12:58:32.7426642",
                    "updatedBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9",
                    "createdBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9"
                }
            ],
            "handicaps": []
        },
        {
            "id": "8a019235-62db-4715-56fb-08dc852d9610",
            "name": "project 1",
            "description": "this is descriotinj for project 1",
            "startDate": "2024-06-07T07:37:34",
            "endDate": "2024-06-13T18:00:00",
            "budget": 10000.0000,
            "spentBudget": 200.0000,
            "percentage": 10,
            "status": 3,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
            "createdAt": "2024-06-05T13:44:29.9658332",
            "updatedAt": "2024-06-08T15:09:15.36033",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [
                {
                    "id": "3e96c82b-df8c-47a8-5e4b-08dc85404ee5",
                    "description": "ccc xxxx  xxfdfdd",
                    "status": 1,
                    "projectId": "8a019235-62db-4715-56fb-08dc852d9610",
                    "createdAt": "2024-06-05T14:09:26.1186128",
                    "updatedAt": "2024-06-08T15:09:57.7466088",
                    "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
                    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
                }
            ],
            "handicaps": []
        },
        {
            "id": "cff58088-2330-4fe4-e7ec-08dc852b24ae",
            "name": "4111111",
            "description": "asdfasdf",
            "startDate": "2024-06-05T03:42:51.006",
            "endDate": "2024-06-05T03:42:51.006",
            "budget": 2333.0000,
            "spentBudget": 322.0000,
            "percentage": 33,
            "status": 2,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-06-05T09:45:52.5282395",
            "updatedAt": "2024-06-05T10:44:13.8156026",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [
                {
                    "id": "4c2683a2-fa0d-44a1-f235-08dc852afd7d",
                    "description": "sadfsadfsadf",
                    "status": 2,
                    "projectId": "cff58088-2330-4fe4-e7ec-08dc852b24ae",
                    "createdAt": "2024-06-05T09:45:52.6044683",
                    "updatedAt": "2024-06-05T12:38:18.5603806",
                    "updatedBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9",
                    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
                }
            ],
            "handicaps": [
                {
                    "id": "63af647d-91e3-432b-92dc-08dc852b24bf",
                    "description": "asdfasdf",
                    "status": 2,
                    "projectId": "cff58088-2330-4fe4-e7ec-08dc852b24ae",
                    "createdAt": "2024-06-05T09:45:52.6340316",
                    "updatedAt": "2024-06-05T12:38:18.5599428",
                    "updatedBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9",
                    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
                }
            ]
        },
        {
            "id": "9b379a42-32b3-47d1-56fa-08dc852d9610",
            "name": "The name",
            "description": "description descriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptiondescriptionvdescriptiondescriptiondescriptiondescription",
            "startDate": "2024-06-04T15:12:45.777",
            "endDate": "2039-06-19T15:12:45",
            "budget": 50.0000,
            "spentBudget": 2.0000,
            "percentage": 1,
            "status": 3,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-06-05T12:17:22.7007406",
            "updatedAt": "2024-06-05T13:37:42.8199797",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "190aaf3a-81b8-4ba2-a804-9f5f9b49d4e9",
            "risks": [],
            "handicaps": []
        },
        {
            "id": "a172b3ef-58bc-4c9a-91ae-08dc848f3da5",
            "name": "wwwwww",
            "description": "wwwww",
            "startDate": "2024-06-04T09:11:54.862",
            "endDate": "2024-06-04T09:11:54.862",
            "budget": 333.0000,
            "spentBudget": 33.0000,
            "percentage": 33,
            "status": 2,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
            "createdAt": "2024-06-04T15:17:09.6803654",
            "updatedAt": "2024-06-04T15:52:08.1052285",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [],
            "handicaps": []
        },
        {
            "id": "a0838835-2b1e-4796-7e6e-08dc8480595a",
            "name": "test project 2020",
            "description": "bla bla bla",
            "startDate": "2024-06-04T07:31:08.003",
            "endDate": "2024-06-22T07:31:08",
            "budget": 14474.0000,
            "spentBudget": 2635.0000,
            "percentage": 0,
            "status": 1,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
            "createdAt": "2024-06-04T13:32:17.6752356",
            "updatedAt": "2024-06-04T16:50:28.3129941",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [
                {
                    "id": "73dc3bd1-6b0e-4b17-219a-08dc848f3db3",
                    "description": "vfvvfvvfv",
                    "status": 1,
                    "projectId": "a0838835-2b1e-4796-7e6e-08dc8480595a",
                    "createdAt": "2024-06-04T16:50:28.2989783",
                    "updatedAt": null,
                    "updatedBy": null,
                    "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb"
                }
            ],
            "handicaps": []
        },
        {
            "id": "d357f50e-1ea2-4c63-7e6f-08dc8480595a",
            "name": "1234567",
            "description": "asdfasfd",
            "startDate": "2024-06-03T10:34:07.839",
            "endDate": "2024-06-03T10:34:07.839",
            "budget": 2333323.0000,
            "spentBudget": 33233.0000,
            "percentage": 33,
            "status": 4,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "7c491c54-4106-43c5-ba79-08dc7f08e15f",
            "createdAt": "2024-06-04T13:35:39.0813573",
            "updatedAt": "2024-06-04T14:32:43.1537426",
            "updatedBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [],
            "handicaps": []
        },
        {
            "id": "df67ef97-b02d-4475-a43e-08dc83ab7ad8",
            "name": "asdf saf sa f",
            "description": "asdf sa  as",
            "startDate": "2024-06-03T09:26:39.467",
            "endDate": "2024-06-03T09:26:39.467",
            "budget": 23.0000,
            "spentBudget": 43.0000,
            "percentage": 33,
            "status": 2,
            "branchId": "2b03afc6-b5d0-4e71-8e9d-08dc7f075dfe",
            "supervisorId": "14c4cb7e-f0b4-4dbe-f1d3-08dc7ef69b34",
            "createdAt": "2024-06-03T12:27:08.2112007",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [],
            "handicaps": []
        },
        {
            "id": "d035b5b0-6119-4c06-a43a-08dc83ab7ad8",
            "name": "sadfef a sdf safd ",
            "description": "asdfsafd",
            "startDate": "2024-06-03T09:21:49.673",
            "endDate": "2024-06-03T09:21:49.673",
            "budget": 222.0000,
            "spentBudget": 33.0000,
            "percentage": 33,
            "status": 2,
            "branchId": "cd3215dd-4dc8-441c-005f-08dc7ee21558",
            "supervisorId": "191c407f-d8ac-4f11-21bc-08dc7ee246ad",
            "createdAt": "2024-06-03T12:25:08.0635092",
            "updatedAt": "0001-01-01T00:00:00",
            "updatedBy": "00000000-0000-0000-0000-000000000000",
            "createdBy": "b37b6f4f-c135-46f6-a28c-fcc444e960cb",
            "risks": [],
            "handicaps": []
        }
    ]
}
 */
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

