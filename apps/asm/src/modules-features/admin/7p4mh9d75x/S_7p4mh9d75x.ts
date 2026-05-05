// import { menuData } from "@/data/menuData";
import { menuData } from "@/data/menuData";
import { createGenericStore } from "@/stores/S0GenericStore";


export interface I_7p4mh9d75x_Fetch {
    pageId?: number,
    isCreate?: boolean,
    isUpdate?: boolean,
    isDelete?: boolean,
    isRead?: boolean,
    isPrint?: boolean,
    isExport?: boolean,
    name?: string,
}


export interface I_7p4mh9d75x_GroupMenu {
    label?: string,
    pageId?: number,
    children?: I_7p4mh9d75x_GroupMenu[]
}

export interface I {
    userId?: number,
    data?: I_7p4mh9d75x_Fetch[],
    groupMenu?: I_7p4mh9d75x_GroupMenu[]
}

function transformMenuToGroupMenu(menuItems: any[]): I_7p4mh9d75x_GroupMenu[] {
    const result: I_7p4mh9d75x_GroupMenu[] = [];

    for (const item of menuItems) {
        if (item.label == "Dashboard") {
            result.push({
                label: item.label,
                children: [
                    {
                        label: "Dashboard",
                        pageId: item.id
                    }
                ]
            })
        }
        // If item has links, process them
        if (item.links) {
            // Create group for current item
            const groupItem: I_7p4mh9d75x_GroupMenu = {
                label: item.label,
                children: []
            };

            // Process all links in this group
            for (const link of item.links) {
                if (link.links) {
                    // If link has nested links, process them recursively
                    const nestedGroup: I_7p4mh9d75x_GroupMenu = {
                        label: link.label,
                        children: transformMenuToGroupMenu(link.links)
                    };
                    groupItem.children?.push(nestedGroup);
                } else {
                    // Add leaf node
                    groupItem.children?.push({
                        label: link.label,
                        pageId: link.id
                    });
                }
            }
            result.push(groupItem);
        }
    }

    return result;
}

// Filter menuData to get items from second level (items with index > 0)
const secondLevelMenuData = menuData.slice(0);


const S_7p4mh9d75x = createGenericStore<I>({ userId: 0, data: [], groupMenu: transformMenuToGroupMenu(secondLevelMenuData) }, 'S_7p4mh9d75x')


export default function useS_7p4mh9d75x() {
    const store = S_7p4mh9d75x()
    function getFetchByPageId(pageId: number): I_7p4mh9d75x_Fetch | undefined {
        return store.state.data?.find(item => item.pageId === pageId);
    }
    function updateFetchByPageId(pageId: number, newData: Partial<I_7p4mh9d75x_Fetch>): void {
        const index = store.state.data?.findIndex(item => item.pageId === pageId);
        if (index !== undefined && index !== -1 && store.state.data) {
            store.state.data[index] = { ...store.state.data[index], ...newData };
        }
    }
    return {
        ...store,
        getFetchByPageId,
        updateFetchByPageId
    }
}