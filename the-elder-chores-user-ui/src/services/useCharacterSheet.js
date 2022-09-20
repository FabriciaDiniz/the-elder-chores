import {usePocketbase} from "../components/Pocketbase";
import {useQuery} from "react-query";

const useCharacterSheet = () => {
    const client = usePocketbase();
    console.log(client.authStore.model);
    console.log('sheet_id', client.authStore.model.profile.character_sheet);

    return useQuery({
        queryKey: `character-${client.authStore.model.id}`,
        queryFn: async () => {
            return await client.records.getOne('sheets', client.authStore.model.profile.character_sheet);
        }
    });
};

export default useCharacterSheet;
