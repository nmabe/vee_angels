import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger,  } from "@/components/ui/dropdown-menu";
import AngelsFilter from "../../components/v-angels/filter"
import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "lucide-react";
import { sortOptions } from "@/config";
import { AngelCard } from "@/components/v-angels/angelCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchFilteredAngels, getLikes } from "@/store/angels/angels-slice";
import { createSearchParams, useSearchParams, Link } from "react-router-dom";
import SearchBar from "react-js-search";

const AngelsFavesPage = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const angelsList = useSelector((state) => state.filteredAngel.angelsList.angels);
    const [likes, setLikes] = useState([]);
    const [sort, setSort] = useState(null);
    const [filter, setFilter] = useState({});
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState('');
    const [faves, setFaves] = useState([]);

    const createSearchParamsHelper = (filter) => {
        const queryParams = [];

        for (const [key, value] of Object.entries(filter)) {
            if (Array.isArray(value) && value.length > 0) {
                const filterValues = value.join(',');
                
                queryParams.push(`${key}=${encodeURIComponent(filterValues)}`);
            }
        }
        return queryParams.join('&');
    }

    const handleFilter = (getSectionId, getCurrentOption) => {
        let filtersCopy = { ...filter };
        const indexOfCurrentSection = Object.keys(filtersCopy).indexOf(getSectionId);

        if (indexOfCurrentSection === -1) {
            filtersCopy = {
                ...filtersCopy,
                [getSectionId]: [getCurrentOption],
            }
        }else {
            const indexOfCurrentOption = filtersCopy[getSectionId].indexOf(getCurrentOption);

            if (indexOfCurrentOption === -1) {
                filtersCopy[getSectionId].push(getCurrentOption);
            }else {
                filtersCopy[getSectionId].splice(indexOfCurrentOption, 1);
            }
        }
        setFilter(filtersCopy);
        sessionStorage.setItem('filters', JSON.stringify(filtersCopy));
    }

    useEffect(() => {
        if (filter && Object.keys(filter).length > 0) {
            const queryString = createSearchParamsHelper(filter);
            setSearchParams(new URLSearchParams(queryString));
        }
    }, [filter]);


    useEffect(() => {
        setSort('newest');
        setFilter(JSON.parse(sessionStorage.getItem('filters')) || {});
    }, []);

    useEffect(() => {
        dispatch(fetchFilteredAngels({filter, sort}));
    },[dispatch, filter, sort]);


    useEffect(() => {
    const fetchLikes = async () => {
        if (!user?.id) return; // Exit early if no user ID

        try {
            const res = await dispatch(getLikes(user.id));
            if (res?.payload?.likes) {
                setLikes(res.payload.likes);
            } else {
                setLikes([]); // fallback if likes are missing
            }
        } catch (error) {
            console.error("Failed to fetch likes:", error);
            setLikes([]); // fallback on error
        }
    };
        fetchLikes();
    }, [dispatch, user?.id]);

    useEffect(() => {
        if (!searchTerm) {
            setFaves(angelsList);
        } else {
            const lower = searchTerm.toLowerCase();
            setFaves(
                (angelsList || []).filter((angel) => {
                    return (
                        (angel?.username && angel.username.toLowerCase().includes(lower)) ||
                        (angel?.firstname && angel.firstname.toLowerCase().includes(lower)) ||
                        (angel?.lastname && angel.lastname.toLowerCase().includes(lower)) ||
                        (angel?.address?.city && angel.address.city.toLowerCase().includes(lower)) ||
                        (angel?.address?.suburb && angel.address.suburb.toLowerCase().includes(lower))
                    );
                })
            );
        }
    }, [searchTerm, angelsList]);


    return (
        <div className="min-h-screen font-inter text-gray-900 bg-white">
            <div className="container mx-auto px-4 md:px-6 py-12 max-w-7xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-black mb-2 leading-tight">Favorites</h1>
                    <p className="text-base md:text-lg leading-normal text-gray-600 max-w-2xl mx-auto">Your favorite angels — curated just for you.</p>
                    <div className="mt-6 flex justify-center md:justify-start">
                        <Link to="/angels/angels" className="bg-gradient-to-r from-[#892f82] to-purple-600 text-white py-2.5 px-6 rounded-full font-semibold text-sm shadow-md hover:shadow-lg transition">Explore Angels</Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 mt-0 md:grid-cols-[250px_1fr] gap-4">
                    <AngelsFilter filter={filter} handleFilter={handleFilter} />
                    <div className="bg-white w-full rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        <div className="p-4 border-b flex items-center justify-between">
                            <h4 className="text-xl font-extrabold">Favorites</h4>
                    <div className="flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant='outline' size='sm' className='flex items-center gap-1 font-extrabold'>
                                    <ArrowUpDownIcon strokeWidth={3} className="h-4 w-4 " />
                                    sort by
                                    </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align='end' className='w-[200px] '>
                                <DropdownMenuRadioGroup value={sort} onValueChange={(value) => setSort(value)}>
                                    {
                                        sortOptions.map(item => <DropdownMenuRadioItem 
                                        key={item.id} 
                                        value={item.id}
                                        >{item.label}

                                        </DropdownMenuRadioItem>)
                                    }
                                </DropdownMenuRadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <span className="text-muted-background">{faves?.filter((angel) => {
                                    const isLiked = (likes || []).some((like) => like.angelId === angel._id && like.userId === user?.id);
                                    return isLiked;
                                }).length} Angels</span>
                        </div>
                    </div>
                <SearchBar
                        className="flex flex-1 w-full"
                        placeHolderText={'Search here...'}
                        data={angelsList}
                        onSearchTextChange={setSearchTerm}
                        />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-3">
                    {
                        (faves && faves.length > 0) ? (
                            faves
                                .filter((angel) => {
                                    const isLiked = (likes || []).some((like) => like.angelId === angel._id && like.userId === user?.id);
                                    return isLiked;
                                })
                                .map((angel) => (
                                    <AngelCard userId={user?.id || 0} angel={angel} key={angel._id} likes={likes} />
                                ))
                        ) : (
                            <p className="text-center text-gray-700 col-span-full">No Angels Found</p>
                        )
                    }
                </div> {/* end result grid */}
            </div> {/* end outer grid */}
        </div> {/* end container */}
    </div> {/* end page wrapper */}
    </div>
  )
}

export default AngelsFavesPage;