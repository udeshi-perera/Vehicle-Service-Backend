// import request, { gql } from "graphql-request";
// import { PaginateArgs } from "./dto/args/paginate.args";
// import { PaginateVehicle } from "./models/paginate-vehicle";
// import { Vehicle } from "./models/vehicle";

// export class FileReaderGraphQLAPI {
//     async getAllVehicles(paginate:PaginateArgs):Promise<PaginateVehicle>{
//         // var offset:number;
//         // if(page==1){
//         //   offset=0*100;
//         // }else{
//         //   offset=page*100;
//         // }
//         const query1=gql`
//         query (
//           $first:Int,
//           $offset:Int,
//       ){
//         allVehicles(
//           first:$first, 
//           offset:$offset,
//         ){
//             totalCount
//             pageInfo {
//               hasNextPage
//               hasPreviousPage
//             }
//             nodes{
//               id
//               firstName
//               lastName
//               email
//               carMake
//               carModel
//               vinNumber
//               manufacturedDate
//             }
//         }
//       }
        
//       `;
//     //   const dataDetail= await request('http://localhost:5000/graphql',query1)
//     //   console.log(dataDetail.allVehicles);
//     //   return dataDetail.allVehicles.nodes;

//     const dataDetail = await request('http://localhost:5000/graphql',query1);
//     console.log(dataDetail);
//     // .then(data=>{
//     //     console.log(dataDetail);
//     //     const res: PaginateVehicle={
//     //         // totalCount:dataDetail.totalCount;
//     //         // vehicles:dataDetail.nodes;
//     //     };
//     //     return res;
//     // })
//     return dataDetail.allVehicles;
//     }
// }