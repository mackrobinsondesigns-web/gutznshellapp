// @ts-expect-error The Supabase dependency is provided by the app's runtime.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zukzwhpllvmsengpbcpx.supabase.co";

const supabasePublishableKey = "sb_publishable_wc8Yk-fEWS3rhAcTboXKvw_Dpj-84dJ";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);
