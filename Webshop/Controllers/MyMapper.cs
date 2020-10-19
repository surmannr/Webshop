using AutoMapper;
//Ezt nem használjuk, de nem akarom megölni.
public class MyMapper {
    public static A myMapper<A,B>(ref B dto)
    {
        var config = new MapperConfiguration(cfg =>
        {
            cfg.CreateMap<A, B>();
        });
        IMapper iMapper = config.CreateMapper();
        var destination = iMapper.Map<B, A>(dto);
        return destination;
    }
}
