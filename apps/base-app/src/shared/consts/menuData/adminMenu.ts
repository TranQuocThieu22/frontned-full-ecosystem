import { NavbarMenuData } from "@aq-fe/core-ui/shared/interfaces/NavbarMenuData";
import { AppPage } from "@/shared/consts/enum/appPage";
import { PageNameLanguageKey } from "@/shared/types/PageNameLanguageKey";

export const adminMenuData: NavbarMenuData<PageNameLanguageKey>[] = [
    // {
    //     itemNameLanguageKey: 'app:MENU.FEATURE_1',
    //     itemType: 'link',
    //     pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
    // },
    {
        customItemName: 'Custom Feature group',
        itemType: 'title-with-dropdown',
        items: [
            {
                customItemName: 'Custom Section',
                itemType: 'new-dimension',
                items: [
                    {
                        customItemName: 'Custom Feature 2',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature2, route: "/admin/example-feature-2",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_3',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature3, route: "/admin/example-feature-3",
                    }
                ]
            },
            {
                customItemName: 'Custom Feature 4',
                itemType: 'link',
                pageId: AppPage.ExampleFeature4, route: "/admin/example-feature-3/example-feature-4",
            },
            {
                customItemName: 'Section 1',
                itemType: 'section',
                pageId: 5, route: "/admin/example-feature-1.1",
                items: [
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                ]
            },
            {
                customItemName: 'Section 2',
                itemType: 'section',
                pageId: 5, route: "/admin/example-feature-1.1",
                items: [
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                ]
            },
            {
                customItemName: 'Section & dropdown',
                itemType: 'section-with-dropdown',
                pageId: 5, route: "/admin/example-feature-1.1",
                items: [
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                ]
            },
            {
                customItemName: 'Section & dropdown 2',
                itemType: 'section-with-dropdown',
                pageId: 5, route: "/admin/example-feature-1.1",
                items: [
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                ]
            },
            {
                customItemName: 'Section & dropdown 3',
                itemType: 'section-with-dropdown',
                pageId: 5, route: "/admin/example-feature-1.1",
                items: [
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                    {
                        itemNameLanguageKey: 'app:MENU.FEATURE_1',
                        itemType: 'link',
                        pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                    },
                ]
            },
        ]
    },
    {
        customItemName: 'Custom Feature group 2',
        itemType: 'title-with-dropdown',
        items: [
            {
                customItemName: 'Feature 1 ver 2',
                itemType: 'link',
                pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
            },
            {
                customItemName: 'Section 1',
                itemType: 'new-dimension',
                items: [
                    {
                        customItemName: 'Part 1.1',
                        itemType: 'section',
                        pageId: 5, route: "/admin/example-feature-2",
                        items: [
                            {
                                itemNameLanguageKey: 'app:MENU.FEATURE_1',
                                itemType: 'link',
                                pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                            },
                            {
                                itemNameLanguageKey: 'app:MENU.FEATURE_1',
                                itemType: 'link',
                                pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                            },
                        ]
                    },
                    {
                        customItemName: 'Part 1.2, very long name to test UI behavior, long name indeed',
                        itemType: 'section',
                        pageId: 6, route: "/admin/example-feature-6",
                        items: [
                            {
                                itemNameLanguageKey: 'app:MENU.FEATURE_1',
                                itemType: 'link',
                                pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                            },
                            {
                                itemNameLanguageKey: 'app:MENU.FEATURE_1',
                                itemType: 'link',
                                pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
                            },
                        ]
                    },
                    {
                        customItemName: 'Feature 6 very long name to test UI behavior, long name indeed',
                        itemType: 'link',
                        pageId: 6, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 5.1 very long name to test UI behavior, long name indeed',
                        itemType: 'link',
                        pageId: 51, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 5.2 very long name to test UI behavior, long name indeed',
                        itemType: 'section-with-dropdown',
                        items: [
                            {
                                customItemName: 'Nested Feature 5.2.1, long name to test UI behavior, long name indeed',
                                itemType: 'new-dimension',
                                items: [
                                    {
                                        customItemName: 'Nested Feature 5.2.1.1, long name to test UI behavior, long name indeed',
                                        itemType: 'section-with-dropdown',
                                        items: [
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 54, route: "/admin/example-feature-1",
                                            },
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 55, route: "/admin/example-feature-1",
                                            },
                                        ]
                                    },
                                    {
                                        customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                        itemType: 'link',
                                        pageId: 54, route: "/admin/example-feature-2",
                                    },
                                    {
                                        customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                        itemType: 'link',
                                        pageId: 55, route: "/admin/example-feature-2",
                                    },
                                    {
                                        customItemName: 'Nested Feature 5.2.1.2',
                                        itemType: 'section',
                                        items: [
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 54, route: "/admin/example-feature-1",
                                            },
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 55, route: "/admin/example-feature-2",
                                            },
                                            {
                                                customItemName: 'Nested Feature 5.2.1.3',
                                                itemType: 'section',
                                                items: [
                                                    {
                                                        customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                        itemType: 'link',
                                                        pageId: 54, route: "/admin/example-feature-2",
                                                    },
                                                    {
                                                        customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                        itemType: 'link',
                                                        pageId: 55, route: "/admin/example-feature-2",
                                                    },
                                                ]
                                            },
                                        ]
                                    },
                                    {
                                        customItemName: 'Nested Feature 5.2.1.3',
                                        itemType: 'section-with-dropdown',
                                        items: [
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 54, route: "/admin/example-feature-2",
                                            },
                                            {
                                                customItemName: 'Feature 5.1, wow very long name to test UI behavior, and nested indeed',
                                                itemType: 'link',
                                                pageId: 55, route: "/admin/example-feature-2",
                                            },
                                        ]
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        customItemName: 'Feature 5.1 very long name to test UI behavior, long name indeed',
                        itemType: 'link',
                        pageId: 53, route: "/admin/example-feature-1.11",
                    },

                ]
            },
            {
                customItemName: 'Section 2',
                itemType: 'section-with-dropdown',
                items: [
                    {
                        customItemName: 'Feature 7',
                        itemType: 'link',
                        pageId: 7, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 8',
                        itemType: 'link',
                        pageId: 8, route: "/admin/example-feature-1",
                    }
                ]
            },
        ]
    },
    {
        customItemName: 'Custom Feature group 3 very long name to test UI behavior',
        itemType: 'title-with-dropdown',
        items: [
            {
                customItemName: 'Section 1 very long name to test UI behavior',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 9',
                        itemType: 'link',
                        pageId: 9, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 10 very long name to test UI behavior',
                        itemType: 'link',
                        pageId: 10, route: "/admin/example-feature-1",
                    }
                ]
            },
            {
                customItemName: 'Section 2 very long name to test UI behavior',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 11 eventually very long long long long name to test UI behavior ',
                        itemType: 'link',
                        pageId: 11, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 12',
                        itemType: 'link',
                        pageId: 12, route: "/admin/example-feature-2",
                    }
                ]
            },
        ]
    },
    // {
    //     itemNameLanguageKey: 'app:MENU.FEATURE_5',
    //     itemType: 'link',
    //     pageId: AppPage.ExampleFeature5, route: "/admin/example-feature-5",
    // },
    {
        customItemName: 'Custom Feature group 4',
        itemType: 'title-with-dropdown',
        items: [
            {
                customItemName: 'Section 1',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 13',
                        itemType: 'link',
                        pageId: 13, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 14',
                        itemType: 'link',
                        pageId: 14, route: "/admin/example-feature-2",
                    }
                ]
            },
            {
                customItemName: 'Section 2',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 15',
                        itemType: 'link',
                        pageId: 15, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 16',
                        itemType: 'link',
                        pageId: 16, route: "/admin/example-feature-2",
                    }
                ]
            },
        ]
    },
    {
        customItemName: 'Custom Feature group 5 very very long name to test UI behavior, very long name, long name indeed',
        itemType: 'title-with-dropdown',
        items: [
            {
                customItemName: 'Section 1',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 17',
                        itemType: 'link',
                        pageId: 17, route: "/admin/example-feature-1",
                    },
                    {
                        customItemName: 'Feature 18',
                        itemType: 'link',
                        pageId: 18, route: "/admin/example-feature-1",
                    }
                ]
            },
            {
                customItemName: 'Section 2',
                itemType: 'section',
                items: [
                    {
                        customItemName: 'Feature 19',
                        itemType: 'link',
                        pageId: 19, route: "/admin/example-feature-2",
                    },
                    {
                        customItemName: 'Feature 20',
                        itemType: 'link',
                        pageId: 20, route: "/admin/example-feature-2",
                    }
                ]
            },
        ]
    },
    // {
    //     customItemName: 'Feature 1 ver 3',
    //     itemType: 'link',
    //     pageId: AppPage.ExampleFeature1, route: "/admin/example-feature-1",
    // },
];