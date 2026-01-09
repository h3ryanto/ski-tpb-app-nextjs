"use client";
import PageGuard from "@/components/guards/PageGuard";
import AppExportExcelButton from "@/components/ui/app-export-excel-button";
import { ImportDataExcell } from "@/components/ui/app-import-excel";
import AppLoading from "@/components/ui/app-loading";
import { Search } from "@/components/ui/app-search";
import AppTableList from "@/components/ui/app-table-tpb";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePermission } from "@/hooks/usePermission";
import { requirePermission } from "@/lib/auth/server-permission";
import { RefreshCcwIcon } from "lucide-react";
import { useRouter } from 'next/navigation';
import {
  Suspense,
  use,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;
export default function Dokumen(props: { searchParams: SearchParams }) {
  const router = useRouter()
  const { toast } = useToast();
  const searchParams = use(props.searchParams);
  const search = searchParams?.query?.toString() || "";
  const kode_dokumen = searchParams?.kodeDokumen?.toString() || "";
  const nomor_aju = searchParams?.nomorAju?.toString() || "";
  const entitas = searchParams?.suplier?.toString() || "";
  const nomor_daftar = searchParams?.nomorDaftar?.toString() || "";
  const no_dokumen = searchParams?.dokumen?.toString() || "";
  const date_from = searchParams?.date_from?.toString() || "";
  const date_to = searchParams?.date_to?.toString() || "";
  const sortBy = searchParams?.sortBy?.toString() || "";
  const asc = searchParams?.asc?.toString() || "";
  const kode_valuta = searchParams?.kodeValuta?.toString() || "";
  const filter = useMemo(
    () => ({
      kode_dokumen,
      nomor_aju,
      entitas,
      nomor_daftar,
      no_dokumen,
      date_from,
      date_to,
      sortBy,
      asc,
      kode_valuta,
    }),
    [
      kode_dokumen,
      nomor_aju,
      entitas,
      nomor_daftar,
      no_dokumen,
      date_from,
      date_to,
      sortBy,
      asc,
      kode_valuta,
    ]
  );
  const currenPage = Number(searchParams?.page) || 1;
  const page_size = Number(searchParams?.pageSize) || 10;
  const limit = Number(searchParams?.pageSize) || 10;
  const [posts, setPosts] = useState<any[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshTrigger, setRefreshTrigger] = useState<number>(0);
  const { can } = usePermission();


  const realoadTriggerHandler = () => {
    // Naikkan angka → trigger useEffect di AppPdfLinkIcon
    setRefreshTrigger((prev) => prev + 1);
  };

  const getDokumen = useCallback(
    async (currenPage: number, page_size: number, search: any, filter: any) => {
      try {
        setIsLoading(true);
        const data = await fetch(`/api/get-dokumen`, {
          method: "post",
          body: JSON.stringify({
            search: search,
            page: currenPage,
            size: page_size,
            filter: filter,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (data) {
          const posts = await data.json();

          if (posts.posts) {
            setIsLoading(false);
            setPosts(posts.posts.data || []);
            setTotal(posts.posts.meta.total || 0);
            setPage(posts.posts.meta.page || 1);
            setSize(posts.posts.meta.size || 10);
          }
        }
      } catch (error) {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Error Conecting Server Database",
          description: `${error}`,
        });
      }
    },
    [toast]
  );

  useEffect(() => {
    requirePermission("/dokumen-tpb").then((result) => {
      if (!result.allowed) {
        router.push("/forbidden");
      }
    });
    getDokumen(currenPage, page_size, search, filter);
  }, [currenPage, page_size, search, filter, getDokumen, refreshTrigger, router]);

  // console.log(posts)
  return (
    <PageGuard>
      <Suspense>
        <AppTableList
          posts={posts}
          page={page}
          page_size={size}
          limit={limit}
          dataEntry={total}
          realoadTriggerHandler={realoadTriggerHandler}
          refreshTrigger={refreshTrigger}
        >
          <div className="flex flex-row gap-3">
            <Button
              className="flex flex-row w-fit"
              onClick={() => {
                getDokumen(currenPage, page_size, search, filter);
                realoadTriggerHandler();
              }}
            >
              <RefreshCcwIcon className={isLoading ? "animate-spin" : ""} />
              Muat Ulang
            </Button>

            <div className="flex items-center gap-2">
              {can("import_excel") && (
                <ImportDataExcell
                  saveUrl="/api/save-data"
                  reload={async () => {
                    realoadTriggerHandler();
                  }}
                />
              )}
              {can("export_excel") && <AppExportExcelButton />}
            </div>

            <div className="flex items-center">
              <Search />
            </div>
          </div>
        </AppTableList>
        <AppLoading isLoading={isLoading} />
      </Suspense>
    </PageGuard>
  );
}
