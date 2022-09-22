import {usePocketbase} from "../components/Pocketbase";
import {useQuery} from "react-query";

const useManager = () => {
    const client = usePocketbase();

    return useQuery({
        queryKey: getCharacterManagerKey(client),
        queryFn: async () => {
            if (client.authStore.model.profile.manager) {
                const profiles = await client.records.getList('profiles', undefined, undefined, {
                    filter: `userId='${client.authStore.model.profile.manager}'`
                });

                if (profiles.items.length > 0) {
                    return profiles.items[0];
                }
            }

            return undefined;
        }
    });
};

export const getCharacterManagerKey = (client) => {
    return `manager-${client.authStore.model.profile.manager}`;
}

export default useManager;
