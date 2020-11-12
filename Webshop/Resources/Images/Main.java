import java.util.*;

public class Main {

    private final LinkedHashMap<Integer, ArrayList<Integer>> dataStructure = new LinkedHashMap<>();
    int bayes_halo_csomopontjainak_szama;
    int evidenciaValtozokDarabSzama;
    int celValtozoIndexe;
    List<Main.CsomopontokLeirasa> csomopontok = new ArrayList<>();
    List<Main.EvidenciaValtozokLeirasa> evidenciaValtozok = new ArrayList<>();
    Scanner scanner = new Scanner(System.in);

    Main() {

        bayes_halo_csomopontjainak_szama = Integer.parseInt(scanner.nextLine());

        for (int fut = 0; fut < bayes_halo_csomopontjainak_szama; fut++) {
            csomopontok.add(new Main.CsomopontokLeirasa(scanner.nextLine()));
        }

        evidenciaValtozokDarabSzama = Integer.parseInt(scanner.nextLine());

        for (int fut = 0; fut < evidenciaValtozokDarabSzama; fut++) {
            evidenciaValtozok.add(new Main.EvidenciaValtozokLeirasa(scanner.nextLine()));
        }

        celValtozoIndexe = Integer.parseInt(scanner.nextLine());


        boolean eviValtozo = false;
        ArrayList<Integer> EgyValtozoErteki = new ArrayList<>();


        for (int i = 0; i < csomopontok.size(); i++) {
            for (int k = 0; k < evidenciaValtozokDarabSzama; k++) {
                if (evidenciaValtozok.get(k).indexe == i) {
                    eviValtozo = true;
                    EgyValtozoErteki.add(evidenciaValtozok.get(k).erteke);
                }
            }
            if (!eviValtozo) {
                for (int j = 0; j < csomopontok.get(i).felvehetoDiszkretErtekek; j++) {
                    EgyValtozoErteki.add(j);
                }
            }
            eviValtozo = false;


            ArrayList<Integer> tmp = new ArrayList<>(EgyValtozoErteki);

            dataStructure.put(i, tmp);
            EgyValtozoErteki.clear();
        }

        String tmp = "";
        double szorzat;
        ArrayList<Double> szorzatok = new ArrayList<>();
        double[] reszOsszegek = new double[csomopontok.get(celValtozoIndexe).felvehetoDiszkretErtekek ];
        Arrays.fill(reszOsszegek, 0.0);





        for (Integer[] combination : allUniqueCombinations()) {

            szorzat = 1.0f;




            for (int i = 0; i < combination.length; i++) {


                if (csomopontok.get(i).szulokSzama == 0) {

                    szorzat *= csomopontok.get(i).felvettErtekekValoszinusegei.get(combination[i]);

                } else {
                    for (int j = 0; j < csomopontok.get(i).szulokSzama; j++) {
                        tmp = tmp.concat(Integer.toString(combination[csomopontok.get(i).szulokIndexei.get(j)]));
                    }


                    szorzat *= csomopontok.get(i).SzuloIndexValoszinusegMap.get(tmp).get(combination[i]);
                    tmp = "";

                }


            }
            reszOsszegek[combination[celValtozoIndexe] % csomopontok.get(celValtozoIndexe).felvehetoDiszkretErtekek] += szorzat;
            szorzatok.add(szorzat);

        }
        double szumma = 0.0;

        for (int i = 0; i < szorzatok.size(); i++) {
            szumma += szorzatok.get(i);
        }

        for (double v : reszOsszegek) {
            System.out.println(v/ szumma);
        }

    }

    public static void main(String[] args) {

        Main main = new Main();

    }

    //https://stackoverflow.com/questions/9591561/java-cartesian-product-of-a-list-of-lists
    public Integer[][] allUniqueCombinations() {
        int n = dataStructure.keySet().size();
        int solutions = 1;

        for (ArrayList<Integer> vector : dataStructure.values()) {
            solutions *= vector.size();
        }

        Integer[][] allCombinations = new Integer[solutions][];

        for (int i = 0; i < solutions; i++) {
            Vector<Integer> combination = new Vector<>(n);
            int j = 1;
            for (ArrayList<Integer> vec : dataStructure.values()) {
                combination.add(vec.get((i / j) % vec.size()));
                j *= vec.size();
            }
            allCombinations[i] = combination.toArray(new Integer[n]);
        }

        return allCombinations;
    }

    static class CsomopontokLeirasa {
        int felvehetoDiszkretErtekek;
        int szulokSzama;
        List<Integer> szulokIndexei = new ArrayList<>();
        List<Integer> szulokAltalfelvettErtekek = new ArrayList<>();
        List<Double> felvettErtekekValoszinusegei = new ArrayList<>();
        List<String> szulokValoszinusegenekIndexei = new ArrayList<>();
        List<List<Double>> szulokValoszinusegenekErtekei = new ArrayList<>();
        List<Double> seged = new ArrayList<>();
        HashMap<String, List<Double>> SzuloIndexValoszinusegMap = new HashMap<>();

        CsomopontokLeirasa(String sor) {
            int index = 0;
            String[] sorSplitelve = sor.split("\t");

            felvehetoDiszkretErtekek = Integer.parseInt(sorSplitelve[index++]);
            szulokSzama = Integer.parseInt(sorSplitelve[index++]);

            for (int i = 0; i < szulokSzama; i++) {
                szulokIndexei.add(Integer.parseInt(sorSplitelve[index++]));
            }
            if (szulokSzama > 0) {
                while (index < sorSplitelve.length) {
                    String SzulokOsszesLehetsegesErtekKombinaciojaEsValoszinusege = sorSplitelve[index++];
                    String[] maradekSorSplitelve = SzulokOsszesLehetsegesErtekKombinaciojaEsValoszinusege.split(":");
                    String SzulokOsszesLehetsegesErtekKombinacioja = maradekSorSplitelve[0];
                    if (maradekSorSplitelve.length > 1) {
                        String SzulokErtekeinekValoszinusege = maradekSorSplitelve[1];
                        maradekSorSplitelve = SzulokErtekeinekValoszinusege.split(",");
                        for (String s : maradekSorSplitelve) {
                            felvettErtekekValoszinusegei.add(Double.parseDouble(s));
                        }
                    }

                    maradekSorSplitelve = SzulokOsszesLehetsegesErtekKombinacioja.split(",");
                    for (String s : maradekSorSplitelve) {
                        szulokAltalfelvettErtekek.add(Integer.parseInt(s));
                    }


                }
                for (int i = 0; i < felvettErtekekValoszinusegei.size(); i++) {
                    seged.add(felvettErtekekValoszinusegei.get(i));

                    if (i % felvehetoDiszkretErtekek == felvehetoDiszkretErtekek - 1) {
                        szulokValoszinusegenekErtekei.add(new ArrayList<>(seged));


                        seged.clear();

                    }

                }

                String tmp = "";
                for (int i = 0; i < szulokAltalfelvettErtekek.size(); i++) {
                    tmp = tmp.concat(Integer.toString(szulokAltalfelvettErtekek.get(i)));
                    if (i % szulokSzama == szulokSzama - 1) {
                        szulokValoszinusegenekIndexei.add(tmp);
                        tmp = "";
                    }
                }
                for (int i = 0; i < szulokValoszinusegenekIndexei.size(); i++) {
                    SzuloIndexValoszinusegMap.put(szulokValoszinusegenekIndexei.get(i), szulokValoszinusegenekErtekei.get(i));
                }

            } else {
                String OsszesLehetsegesErtekKombinaciojaEsValoszinusege = sorSplitelve[index];
                String[] maradekSorSplitelve = OsszesLehetsegesErtekKombinaciojaEsValoszinusege.split(",");
                for (String s : maradekSorSplitelve) felvettErtekekValoszinusegei.add(Double.parseDouble(s));
            }
        }
    }

    static class EvidenciaValtozokLeirasa {
        int indexe;
        int erteke;

        EvidenciaValtozokLeirasa(String sor) {
            String[] sorSplitelve = sor.split("\t");
            indexe = Integer.parseInt(sorSplitelve[0]);
            erteke = Integer.parseInt(sorSplitelve[1]);
        }
    }
}