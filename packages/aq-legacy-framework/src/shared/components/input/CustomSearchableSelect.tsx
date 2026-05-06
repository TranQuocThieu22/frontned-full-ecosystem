import { CustomSelect, CustomSelectProps } from '@aq-fe/core-ui/shared/components/input/CustomSelect';
import { useLegacyReactQuery } from '@aq-fe/aq-legacy-framework/shared/hooks/core/useLegacyReactQuery';
import { BaseEntity } from '@aq-fe/aq-legacy-framework/shared/interfaces/BaseEntity';
import { SafeOmitType } from '@aq-fe/core-ui/shared/types/safeOmitType';
import { useDebouncedValue } from '@mantine/hooks';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';

/**
 * Cấu hình cho việc trích xuất dữ liệu từ entity
 */
interface SearchableSelectConfig<IRes extends BaseEntity> {
    getValue: (item: IRes) => string;
    getLabel: (item: IRes) => string;
    minSearchLength?: number;
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>
    debouncedSearch: string

}

/**
 * Query function type - accepts search term and page number
 */

/**
 * Props cho CustomSearchableSelect component với infinite scroll
 * Tất cả logic được xử lý bên trong component
 */
interface SearchableSelectProps<IRes extends BaseEntity> extends SafeOmitType<CustomSelectProps, "value" | "onChange"> {
    query: ReturnType<typeof useLegacyReactQuery<IRes[], any>>;


    label: string;
    value: IRes | null;
    placeholder?: string;
    onChange: (item: IRes | null) => void;
    config: SearchableSelectConfig<IRes>;
    error?: string;
    clearable?: boolean;
    loadingMessage?: string;
    noResultsMessage?: string;
    minSearchMessage?: string;

    /** Số items mỗi trang cho infinite scroll */
    pageSize?: number;

    /** Khoảng cách từ cuối để trigger load more (px) */
    scrollThreshold?: number;

    /** Thời gian debounce (ms) */
    debounceMs?: number;

    /** Enable debug logging */
    debug?: boolean;
}

/**
 * Component select tự động xử lý tất cả logic:
 * - Debouncing search input
 * - Infinite scroll pagination
 * - Data accumulation
 * - Query management
 * - State management
 *
 * @example Sử dụng đơn giản
 * ```tsx
 * const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
 *
 * <CustomSearchableSelect<Account>
 *   queryKey={["accounts"]}
 *   queryFn={({ search, pageNumber, pageSize }) =>
 *     accountService.getAdminAccount({
 *       paging: { pageNumber, pageSize },
 *       name: search
 *     })
 *   }
 *   label="Tài khoản"
 *   value={selectedAccount}
 *   onChange={setSelectedAccount}
 *   config={{
 *     getValue: (account) => account.id?.toString() ?? '',
 *     getLabel: (account) => `${account.code} - ${account.userName}`,
 *   }}
 * />
 * ```
 */
export default function CustomSearchableSelect<IRes extends BaseEntity>({
    query,
    label,
    value,
    placeholder = "Nhập để tìm kiếm...",
    onChange,
    config,
    error,
    clearable = true,
    loadingMessage = "Đang tìm kiếm...",
    noResultsMessage = "Không tìm thấy kết quả",
    minSearchMessage = "Nhập ít nhất {min} ký tự để tìm kiếm",
    pageSize = 20,
    scrollThreshold = 50,
    debounceMs = 800,
    debug = false,
    ...rest
}: SearchableSelectProps<IRes>) {
    const minSearchLength = config.minSearchLength ?? 2;
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const scrollListenerAttached = useRef(false);


    const [allData, setAllData] = useState<IRes[]>([]);

    // Debounce search input
    // Debug logging
    const log = useCallback((...args: any[]) => {
        if (debug) {
            console.log('🔍 [CustomSearchableSelect]', ...args);
        }
    }, [debug]);

    // Accumulate data when new page loads
    useEffect(() => {
        log('Data effect:', {
            hasData: !!query.data,
            dataLength: query.data?.length,
            currentPage: config.currentPage,
        });

        if (query.data) {
            setAllData(prev => {
                if (config.currentPage === 1) {
                    log('Resetting data (page 1)');
                    return query.data;
                }
                // Append without duplicates
                const existingIds = new Set(prev.map(item => config.getValue(item)));
                const newItems = query.data.filter(
                    item => !existingIds.has(config.getValue(item))
                );
                log('Appending data:', {
                    prev: prev.length,
                    new: newItems.length,
                    total: prev.length + newItems.length,
                });
                return [...prev, ...newItems];
            });
        }
    }, [query.data, config.currentPage, config, log]);

    // Reset pagination when search changes
    useEffect(() => {
        log('Search changed:', config.debouncedSearch);
        config.setCurrentPage(1);
        setAllData([]);
    }, [config.debouncedSearch, log]);

    // Display data - keeps selected item visible
    const displayData = useMemo(() => {
        const baseData = allData;

        if (value && baseData.length > 0) {
            const foundInData = baseData.find(
                item => config.getValue(item) === config.getValue(value)
            );
            if (!foundInData) {
                return [value, ...baseData];
            }
        }

        if (value && baseData.length === 0) {
            return [value];
        }

        return baseData;
    }, [allData, value, config]);

    const totalCount = query.dataCount ?? 0;

    // Scroll detection for infinite scroll
    useEffect(() => {
        if (!isDropdownOpen) {
            scrollListenerAttached.current = false;
            return;
        }

        let cleanupFn: (() => void) | null = null;

        const findDropdownMenu = () => {
            const selectors = [
                '[role="listbox"]',
                '.mantine-Select-dropdown',
                '[data-mantine-scrollable]',
                '.mantine-ScrollArea-viewport',
                '[class*="Select-dropdown"]',
                '[class*="ScrollArea"]',
            ];

            log('Searching for dropdown with selectors:', selectors);

            // Find scrollable elements
            const allDivs = document.querySelectorAll('div');
            const scrollableElements: HTMLElement[] = [];

            allDivs.forEach((div) => {
                const htmlDiv = div as HTMLElement;
                const style = getComputedStyle(htmlDiv);
                const isScrollable = (
                    (style.overflow === 'auto' || style.overflow === 'scroll' ||
                        style.overflowY === 'auto' || style.overflowY === 'scroll') &&
                    htmlDiv.scrollHeight > htmlDiv.clientHeight
                );

                if (isScrollable) {
                    scrollableElements.push(htmlDiv);
                }
            });

            log('Found scrollable elements:', scrollableElements.length);
            return scrollableElements[scrollableElements.length - 1] || null;
        };

        const attachScrollListener = (dropdown: HTMLElement) => {
            if (scrollListenerAttached.current) {
                return null;
            }

            log('Attaching scroll listener');

            const handleScroll = (event: Event) => {
                const target = event.target as HTMLElement;
                const scrollRemaining = target.scrollHeight - target.scrollTop - target.clientHeight;
                const isNearBottom = scrollRemaining < scrollThreshold;
                const hasMoreData = totalCount > 0 && displayData.length < totalCount;

                if (isNearBottom && !query.isFetching && hasMoreData) {
                    log('Loading more...', {
                        current: displayData.length,
                        total: totalCount,
                        nextPage: config.currentPage + 1,
                    });
                    config.setCurrentPage(prev => prev + 1);
                }
            };

            dropdown.addEventListener('scroll', handleScroll, { passive: true });
            scrollListenerAttached.current = true;

            return () => {
                dropdown.removeEventListener('scroll', handleScroll);
                scrollListenerAttached.current = false;
            };
        };

        const tryAttach = (attempt: number = 1) => {
            const dropdown = findDropdownMenu();

            if (dropdown) {
                log('Dropdown found on attempt', attempt);
                cleanupFn = attachScrollListener(dropdown);
            } else if (attempt < 5) {
                setTimeout(() => tryAttach(attempt + 1), attempt * 100);
            } else {
                log('Failed to find dropdown after 5 attempts');
            }
        };

        tryAttach();

        return () => {
            if (cleanupFn) cleanupFn();
        };
    }, [isDropdownOpen, query.isFetching, displayData.length, totalCount, scrollThreshold, config.currentPage, log]);

    // Handle search change
    const handleSearchChange = (searchText: string) => {
        config.setSearchInput(searchText);
        if (searchText === '' && value) {
            onChange(null);
        }
    };

    // Handle selection
    const handleChange = (selectedValue: string | null) => {
        if (selectedValue) {
            const foundItem = displayData.find(
                (item) => config.getValue(item) === selectedValue
            );
            if (foundItem) {
                onChange(foundItem);
                config.setSearchInput(config.getValue(foundItem));
            }
        } else {
            onChange(null);
            config.setSearchInput('');
        }
    };

    const getNothingFoundMessage = () => {
        if (config.searchInput.length > 0 && config.searchInput.length < minSearchLength) {
            return minSearchMessage.replace('{min}', minSearchLength.toString());
        }
        if (query.isLoading && config.currentPage === 1) {
            return loadingMessage;
        }
        return noResultsMessage;
    };

    const getDisplayData = () => {
        const items = displayData.map((item) => ({
            label: config.getLabel(item),
            value: config.getValue(item),
        }));

        if (query.isFetching && config.currentPage > 1) {
            items.push({
                label: '⏳ Đang tải thêm...',
                value: '__loading__',
                disabled: true,
            } as any);
        } else if (totalCount > 0 && displayData.length >= totalCount) {
            items.push({
                label: `✓ Đã hiển thị tất cả ${totalCount} kết quả`,
                value: '__complete__',
                disabled: true,
            } as any);
        } else if (totalCount > 0 && displayData.length < totalCount) {
            items.push({
                label: `📋 ${displayData.length}/${totalCount}. Cuộn xuống để tải thêm...`,
                value: '__hint__',
                disabled: true,
            } as any);
        }

        return items;
    };

    return (
        <CustomSelect
            error={error}
            label={label}
            placeholder={placeholder}
            searchable
            searchValue={config.searchInput}
            onSearchChange={handleSearchChange}
            data={getDisplayData()}
            value={value ? config.getValue(value) : null}
            onChange={handleChange}
            nothingFoundMessage={getNothingFoundMessage()}
            clearable={clearable}
            limit={1000}
            isLoading={query.isFetching && config.currentPage === 1}
            isError={query.isError}
            onDropdownOpen={() => setIsDropdownOpen(true)}
            onDropdownClose={() => setIsDropdownOpen(false)}
            {...rest}
        />
    );
}
